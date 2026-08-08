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
  /** Set after a failed submit so missing fields are called out */
  showErrors?: boolean;
}

export function ContactFields({
  values,
  onChange,
  messageRequired = false,
  messageLabel = "Message",
  messagePlaceholder,
  idPrefix = "cf",
  showErrors = false,
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

  const baseInput = "h-12 rounded-xl";
  const errorRing = "border-brand-pink ring-1 ring-brand-pink";

  const emailInvalid =
    values.email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());

  const err = {
    firstName: showErrors && values.firstName.trim() === "",
    lastName: showErrors && values.lastName.trim() === "",
    email: (showErrors && values.email.trim() === "") || emailInvalid,
    message: showErrors && messageRequired && values.message.trim() === "",
  };

  const inputClass = (bad: boolean) => `${baseInput} ${bad ? errorRing : ""}`;

  const Error = ({ show, children }: { show: boolean; children: React.ReactNode }) =>
    show ? (
      <p className="text-xs text-brand-pink font-medium">{children}</p>
    ) : null;

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
            aria-invalid={err.firstName}
            className={inputClass(err.firstName)}
          />
          <Error show={err.firstName}>Please enter your first name.</Error>
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
            aria-invalid={err.lastName}
            className={inputClass(err.lastName)}
          />
          <Error show={err.lastName}>Please enter your last name.</Error>
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
          aria-invalid={err.email}
          className={inputClass(err.email)}
        />
        <Error show={err.email}>
          {emailInvalid ? "Please enter a valid email address." : "Please enter your email address."}
        </Error>
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
          className={baseInput}
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
          aria-invalid={err.message}
          className={`rounded-xl resize-y ${err.message ? errorRing : ""}`}
        />
        <Error show={err.message}>Please enter a message.</Error>
      </div>
    </div>
  );
}
