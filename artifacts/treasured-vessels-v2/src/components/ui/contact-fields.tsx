import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const emptyContactDetails: ContactDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

/** True when every required field is filled and the email looks valid. */
export function isContactComplete(v: ContactDetails, messageRequired: boolean) {
  const filled =
    v.firstName.trim() !== "" &&
    v.lastName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim());
  return messageRequired ? filled && v.message.trim() !== "" : filled;
}

interface ContactFieldsProps {
  values: ContactDetails;
  onChange: (values: ContactDetails) => void;
  /** Contact page requires a message; the donation form does not. */
  messageRequired?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  /** Prefix so ids stay unique if two forms ever appear on one page */
  idPrefix?: string;
}

export function ContactFields({
  values,
  onChange,
  messageRequired = false,
  messageLabel = "Message",
  messagePlaceholder,
  idPrefix = "cf",
}: ContactFieldsProps) {
  const set = (key: keyof ContactDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange({ ...values, [key]: e.target.value });

  const label = (text: string, required: boolean) => (
    <>
      {text}{" "}
      {required ? (
        <span className="text-brand-pink" aria-hidden="true">*</span>
      ) : (
        <span className="text-brand-charcoal/50 font-normal">(Optional)</span>
      )}
    </>
  );

  const inputClass = "h-12 rounded-xl";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-first`} className="text-brand-plum font-semibold">
            {label("First Name", true)}
          </Label>
          <Input
            id={`${idPrefix}-first`}
            name="firstName"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={set("firstName")}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-last`} className="text-brand-plum font-semibold">
            {label("Last Name", true)}
          </Label>
          <Input
            id={`${idPrefix}-last`}
            name="lastName"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={set("lastName")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-email`} className="text-brand-plum font-semibold">
          {label("Email Address", true)}
        </Label>
        <Input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={set("email")}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-phone`} className="text-brand-plum font-semibold">
          {label("Phone Number", false)}
        </Label>
        <Input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set("phone")}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-message`} className="text-brand-plum font-semibold">
          {label(messageLabel, messageRequired)}
        </Label>
        <Textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          required={messageRequired}
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={set("message")}
          className="rounded-xl resize-y"
        />
      </div>
    </div>
  );
}
