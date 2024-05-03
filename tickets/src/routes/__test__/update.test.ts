import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "fafa", price: 10 })
    .expect(404);
});

it("returns 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "fafa", price: 10 })
    .expect(401);
});

it("returns 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "title1",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "updated_title1",
      price: 10,
    })
    .expect(401);
});

it("returns a 400 if the user provides invalid title or price", async () => {
  const cookie = global.signin();

  const newTicketRes = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title1",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${newTicketRes.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${newTicketRes.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "title1",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const newTicketRes = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title1",
      price: 20,
    });

  const title = "updated_title1";
  const price = 10;

  await request(app)
    .put(`/api/tickets/${newTicketRes.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  const res = await request(app)
    .get(`/api/tickets/${newTicketRes.body.id}`)
    .send();

  expect(res.body.title).toEqual(title);
  expect(res.body.price).toEqual(price);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const newTicketRes = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "title1",
      price: 20,
    });

  const title = "updated_title1";
  const price = 10;

  await request(app)
    .put(`/api/tickets/${newTicketRes.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    }).expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});