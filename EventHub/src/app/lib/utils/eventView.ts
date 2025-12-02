import type { EventWithRelations } from "@/app/api/events/eventsRepository";
import { slugify } from "./filtering";

export function getAddressLabel(event: EventWithRelations): string {
    return (
        event.address?.formattedAddress ??
        event.address?.label ??
        "Address not available"
    );
}

export function getCity(event: EventWithRelations): string {
    if (event.address?.city) return event.address.city.trim();

    if (event.address?.label) {
        const [first] = event.address.label.split(",");
        return (first ?? "").trim();
    }

    if (event.address?.formattedAddress) {
        const [first] = event.address.formattedAddress.split(",");
        return (first ?? "").trim();
    }

    return "";
}

export function getCitySlug(event: EventWithRelations): string {
    const city = getCity(event);
    return city ? slugify(city) : "";
}

export function getDateTimeLabels(event: EventWithRelations) {
    const raw =
        event.eventStart instanceof Date
            ? event.eventStart
            : event.eventStart
            ? new Date(event.eventStart)
            : null;

    if (!raw || isNaN(raw.getTime())) {
        return { dateLabel: "Date TBA", timeLabel: "Time TBA" };
    }

    return {
        dateLabel: raw.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        timeLabel: raw.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}

export function getPriceLabel(event: EventWithRelations): string {
  const price = event.price ?? 0;
  return price === 0 ? "Free" : `$ ${price}`;
}
