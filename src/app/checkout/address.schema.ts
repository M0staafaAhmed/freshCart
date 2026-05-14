import * as z from "zod";

export const addressSchema = z.object({
    city: z.string().min(2, "City name must be at least 2 characters"),

    postalCode: z
        .string()
        .length(5, "Postal code must be exactly 5 digits")
        .regex(/^\d+$/, "Postal code must contain only numbers"),

    details: z.string().min(5, "Please provide more details about your address"),

    phone: z
        .string()
        .nonempty("Phone number is required")
        .regex(
            /^(?:\+2)?01[0125][0-9]{8}$/,
            "Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx)",
        ),
});
