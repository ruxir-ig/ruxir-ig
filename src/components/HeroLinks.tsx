import { HugeiconsIcon } from '@hugeicons/react';
import { Linkedin02Icon } from '@hugeicons/core-free-icons';
import { Mail01Icon } from './icons/mail-01';
import { GithubIcon } from './icons/github';
import { File01Icon } from './icons/file-01';

type Profile = {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
};

export function HeroLinks({ profile }: { profile: Profile }) {
  return (
    <div className="hero__links" data-reveal>
      <a className="hero__link" href={`mailto:${profile.email}`}>
        <span className="hero__link-bubble" aria-hidden="true">
          <Mail01Icon size={18} />
        </span>
        <span className="hero__link-label">Email</span>
      </a>
      <a className="hero__link" href={profile.github} rel="noopener noreferrer" target="_blank">
        <span className="hero__link-bubble" aria-hidden="true">
          <GithubIcon size={18} />
        </span>
        <span className="hero__link-label">GitHub</span>
      </a>
      <a className="hero__link" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
        <span className="hero__link-bubble" aria-hidden="true">
          <HugeiconsIcon icon={Linkedin02Icon} size={18} strokeWidth={1.6} color="currentColor" />
        </span>
        <span className="hero__link-label">LinkedIn</span>
      </a>
      <a className="hero__link" href={profile.resume}>
        <span className="hero__link-bubble" aria-hidden="true">
          <File01Icon size={18} />
        </span>
        <span className="hero__link-label">Resume</span>
      </a>
    </div>
  );
}
