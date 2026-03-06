import { ResumeHeader } from "@/components/resume/resume-header";
import { ProfessionalSummary } from "@/components/resume/professional-summary";
import { Experience } from "@/components/resume/experience";
import { Education } from "@/components/resume/education";
import { Skills } from "@/components/resume/skills";
import { Certifications } from "@/components/resume/certifications";
import { Awards } from "@/components/resume/awards";

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ResumeHeader />
        <div className="space-y-16">
          <ProfessionalSummary />
          <Experience />
          <Skills />
          <Awards />
          <Education />
          <Certifications />
        </div>

      </div>
    </div>
  );
}