import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@hahusahin/tickets-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
