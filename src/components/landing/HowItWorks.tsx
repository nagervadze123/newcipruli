const steps = [
  {
    step: "01",
    title_ka: "შექმენი",
    body_ka: "შემოდი GitHub-ით, ატვირთე პრომპტი ან ფაილი, მიეცი სახელი და ფასი.",
  },
  {
    step: "02",
    title_ka: "გამოაქვეყნე",
    body_ka: "შენი ნამუშევარი გამოჩნდება კატალოგში. ყველას შეუძლია მისი ნახვა.",
  },
  {
    step: "03",
    title_ka: "დაუკავშირდი",
    body_ka: "მყიდველები უფასო ნამუშევრებს გადმოწერენ, ფასიანზე — გამოგიგზავნიან მოთხოვნას.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 md:px-8 py-24">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
            პროცესი
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            სამი ნაბიჯი — <br />
            <span className="text-gradient">უსასრულო შესაძლებლობა.</span>
          </h2>
          <p className="mt-4 text-[var(--fg-muted)] text-sm md:text-base leading-relaxed max-w-md">
            Cipruli.store-ში არ არის რთული პროცესები. მოიტანე შენი იდეა, ჩვენ მივცემთ სივრცეს.
          </p>
        </div>

        <div className="md:col-span-7 grid gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 flex items-start gap-5"
            >
              <div className="shrink-0 font-display text-5xl md:text-6xl font-bold text-gradient leading-none">
                {s.step}
              </div>
              <div>
                <div className="font-display text-xl md:text-2xl font-semibold">{s.title_ka}</div>
                <div className="mt-2 text-sm md:text-base text-[var(--fg-muted)] leading-relaxed">
                  {s.body_ka}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
