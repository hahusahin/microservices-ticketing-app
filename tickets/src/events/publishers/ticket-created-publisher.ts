import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@hahusahin/tickets-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
