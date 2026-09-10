import { Mail, ScrollText } from "lucide-react";
import Container from "@/components/Container";
import usePageTitle from "@/hooks/usePageTitle";

const LegalPageLayout = ({ page }) => {
  usePageTitle(page.title, true);

  return (
    <>
      <header className="border-y border-gray-200 bg-bHeaderBg dark:border-white/10">
        <Container>
          <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end lg:gap-14 lg:py-20">
            <div className="max-w-3xl">
              <p className="font-dmSans text-xs font-bold uppercase tracking-[0.2em] text-header dark:text-slate-400">
                Orebi
              </p>
              <h1 className="mt-4 font-dmSans text-3xl font-bold leading-tight text-menuHeading sm:text-4xl lg:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl font-dmSans text-sm leading-7 text-header dark:text-slate-300 sm:text-base">
                {page.description}
              </p>
            </div>

            <div className="border-l-2 border-menuHeading/15 pl-5 dark:border-white/20">
              <p className="font-dmSans text-xs font-semibold uppercase tracking-[0.16em] text-header dark:text-slate-400">
                Effective date
              </p>
              <p className="mt-2 font-dmSans text-sm font-bold text-menuHeading">
                {page.effectiveDate}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-background py-10 font-dmSans sm:py-14 lg:py-18">
        <Container>
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <aside className="hidden lg:block">
              <nav
                aria-label={`${page.title} sections`}
                className="sticky top-8 border-l border-gray-200 pl-4 dark:border-white/10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-header dark:text-slate-400">
                  On this page
                </p>
                <ol className="space-y-1.5">
                  {page.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-start gap-2 rounded-md py-1.5 text-sm text-header transition-colors hover:text-menuHeading focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading/30 dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-white/30">
                        <span className="mt-0.5 text-[11px] font-bold text-header/55 dark:text-slate-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <details className="mb-8 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-[#121429] lg:hidden">
              <summary className="cursor-pointer list-none text-sm font-bold text-menuHeading focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading/30 dark:focus-visible:ring-white/30">
                <span className="flex items-center justify-between gap-3">
                  On this page
                  <ScrollText className="h-4 w-4 text-header dark:text-slate-400" aria-hidden="true" />
                </span>
              </summary>
              <ol className="mt-4 grid gap-2 border-t border-gray-100 pt-4 text-sm dark:border-white/10 sm:grid-cols-2">
                {page.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-start gap-2 rounded-md py-1 text-header transition-colors hover:text-menuHeading focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading/30 dark:text-slate-300 dark:hover:text-white dark:focus-visible:ring-white/30">
                      <span className="text-[11px] font-bold text-header/55 dark:text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <article className="min-w-0">
              <div className="mb-10 border-b border-gray-200 pb-8 dark:border-white/10 sm:mb-12">
                <p className="max-w-3xl text-base leading-8 text-header dark:text-slate-300">
                  {page.introduction}
                </p>
              </div>

              <div className="space-y-10 sm:space-y-12">
                {page.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="scroll-mt-28 border-b border-gray-200 pb-10 last:border-b-0 last:pb-0 dark:border-white/10 sm:pb-12">
                    <div className="grid gap-4 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-6">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-bHeaderBg text-xs font-bold text-menuHeading dark:border-white/10 dark:bg-white/10 sm:mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h2
                          id={`${section.id}-heading`}
                          className="text-xl font-bold leading-tight text-menuHeading sm:text-2xl">
                          {section.title}
                        </h2>

                        {section.paragraphs?.length ? (
                          <div className="mt-4 space-y-4 text-sm leading-7 text-header dark:text-slate-300 sm:text-base sm:leading-8">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        ) : null}

                        {section.items?.length ? (
                          <ul className="mt-5 space-y-3 border-l-2 border-menuHeading/15 pl-5 text-sm leading-7 text-header dark:border-white/15 dark:text-slate-300 sm:text-base">
                            {section.items.map((item) => (
                              <li key={item} className="pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {section.subsections?.length ? (
                          <div className="mt-7 space-y-6">
                            {section.subsections.map((subsection) => (
                              <div key={subsection.title}>
                                <h3 className="text-base font-bold text-menuHeading sm:text-lg">
                                  {subsection.title}
                                </h3>
                                <div className="mt-2 space-y-3 text-sm leading-7 text-header dark:text-slate-300 sm:text-base">
                                  {subsection.paragraphs?.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                  ))}
                                </div>
                                {subsection.items?.length ? (
                                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-header marker:text-menuHeading dark:text-slate-300 sm:text-base">
                                    {subsection.items.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}

                        {section.note ? (
                          <div className="mt-6 border-l-2 border-menuHeading bg-bHeaderBg px-5 py-4 dark:border-white dark:bg-[#121429]">
                            <p className="text-sm font-bold text-menuHeading">
                              {section.note.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-header dark:text-slate-300">
                              {section.note.text}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <section className="mt-12 border-t border-gray-200 pt-8 dark:border-white/10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bHeaderBg text-menuHeading dark:bg-white/10">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-menuHeading">
                      Questions about this page?
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm leading-7 text-header dark:text-slate-300">
                      Contact <span className="font-semibold text-menuHeading">niazulalam097@gmail.com</span> and include the page title and enough order or account context for the team to help.
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LegalPageLayout;
