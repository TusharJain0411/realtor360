import Image from "next/image";

const reminders = [
  {
    title: "Submit Final Offer- Villa Deal",
    description: "Finalize and send offer documents.",
  },
  {
    title: "Review Contract with Legal",
    description: "Ensure attorney reviews apartment deal contract today.",
  },
  {
    title: "Call Jessica Chen – Follow-up",
    description: "Discuss her feedback after site visit to Angel Plaza.",
  },
];

const leadAvatars = [
  "/avtar1.jpg",
  "/avtar2.jpg",
  "/avtar3.jpg",
  "/avtar4.jpg",
  "/avtar5.jpg",
];

export default function Reminder() {
  return (
    <div className="w-full rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-4 shadow-[var(--card-shadow)]">
      <h2 className="mb-3 px-1 text-[16px] font-semibold leading-tight text-[var(--text-primary)]">
        Reminder
      </h2>


      <div className="rounded-[var(--radius-md)] bg-[var(--background-muted)] px-3 py-2">
        <h3 className="text-[16px] font-semibold leading-tight text-[var(--text-primary)]">
          Follow-Ups
        </h3>

        <p className="text-[14px] leading-snug text-[var(--text-secondary)]">
          15 leads need to be followed up.
        </p>

    
        <div className="mt-2 flex items-center pl-1">
          {leadAvatars.slice(0, 4).map((avatar, index) => (
            <div
              key={avatar}
              className={`relative h-[24px] w-[24px] shrink-0 overflow-hidden rounded-full border-2 border-[var(--background-white)] bg-[var(--background)] ${
                index === 0 ? "" : "-ml-2"
              }`}
            >
              <Image
                src={avatar}
                alt={`Lead ${index + 1}`}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          ))}

          <span className="relative z-10 -ml-3 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--background-white)] bg-[var(--more-number)] text-[10px] font-medium text-[var(--text-primary)]">
            +11
          </span>
        </div>
      </div>

 
      <div className="mt-4 space-y-6 px-3 pb-2">
        {reminders.map((reminder, index) => (
          <div key={index}>
            <h3 className="text-[16px] font-medium leading-[1.3] text-[var(--text-primary)]">
              {reminder.title}
            </h3>

            <p className="text-[14px] leading-[1.3] text-[var(--text-secondary)]">
              {reminder.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
