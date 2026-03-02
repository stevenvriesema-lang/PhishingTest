import { useState } from 'react'

type MenuNode = {
  label: string
  href: string
  icon?: string
  children?: MenuNode[]
}

const topMenu: MenuNode[] = [
  {
    label: 'Over ons',
    href: 'https://terwille.nl/over-ons/',
    children: [
      { label: 'DNA & ZorgVisie', href: 'https://terwille.nl/dna/' },
      { label: 'Organisatie', href: 'https://terwille.nl/organisatie/' },
      { label: 'Kwaliteit', href: 'https://terwille.nl/kwaliteit/' },
      { label: 'Cliëntenraad', href: 'https://terwille.nl/clientenraad/' },
      { label: 'Suggesties en klachten', href: 'https://terwille.nl/suggesties-en-klachten/' },
      { label: 'Medewerkers', href: 'https://terwille.nl/medewerkers/' },
      { label: 'Persoonlijke verhalen', href: 'https://terwille.nl/persoonlijke-verhalen/' },
    ],
  },
  {
    label: 'Werken bij',
    href: 'https://terwille.nl/werken-bij/',
    children: [
      { label: 'Vacatures', href: 'https://terwille.nl/vacatures/' },
      { label: 'Stage', href: 'https://terwille.nl/stage-vacatures/' },
      { label: 'Vrijwilligerswerk', href: 'https://terwille.nl/vrijwilligerswerk/' },
    ],
  },
  { label: 'Verwijzers', href: 'https://terwille.nl/verwijzers/' },
  { label: 'Help mee', href: 'https://terwille.nl/help-mee/' },
  { label: 'Preventie', href: 'https://terwille.nl/preventie/' },
  { label: 'Mijn Terwille', href: 'https://terwille.nl/mijn-terwille/' },
]

const mainMenu: MenuNode[] = [
  {
    label: 'Verslavingszorg',
    href: 'https://terwille.nl/verslavingszorg/',
    icon: 'alcohol',
    children: [
      { label: 'Alcohol', href: 'https://terwille.nl/alcohol/', icon: 'alcohol' },
      { label: 'Gamen', href: 'https://terwille.nl/gamen/', icon: 'gamen' },
      { label: 'Gokken', href: 'https://terwille.nl/gokken/', icon: 'gokken' },
      { label: 'Harddrugs', href: 'https://terwille.nl/harddrugs/', icon: 'harddrugs' },
      { label: 'Medicijnen', href: 'https://terwille.nl/medicijngebruik/', icon: 'aanmelden' },
      { label: 'Porno en seks', href: 'https://terwille.nl/porno-en-seks/', icon: 'clientenraad' },
      { label: 'Roken', href: 'https://terwille.nl/roken/', icon: 'kosten' },
      { label: 'Wiet', href: 'https://terwille.nl/wiet/', icon: 'naasten' },
    ],
  },
  { label: 'Perspectief+', href: 'https://terwille.nl/prostitutie-zorg/', icon: 'naasten' },
  { label: 'Forensische zorg', href: 'https://terwille.nl/forensische-zorg/', icon: 'clientenraad' },
  {
    label: 'Praktische informatie',
    href: 'https://terwille.nl/praktische-informatie/',
    icon: 'aanmelden',
    children: [
      { label: 'Aanmelden', href: 'https://terwille.nl/aanmelden/', icon: 'aanmelden' },
      { label: 'Behandelprogramma’s', href: 'https://terwille.nl/behandelprogrammas/', icon: 'clientenraad' },
      { label: 'Kosten', href: 'https://terwille.nl/kosten-zpm/', icon: 'kosten' },
      { label: 'Wachttijden', href: 'https://terwille.nl/wachttijden/', icon: 'gokken' },
      { label: 'Locaties', href: 'https://terwille.nl/locaties/', icon: 'harddrugs' },
      { label: 'Naasten', href: 'https://terwille.nl/naasten/', icon: 'naasten' },
      { label: 'Cliëntenraad', href: 'https://terwille.nl/clientenraad/', icon: 'clientenraad' },
    ],
  },
  { label: 'Contact', href: 'https://terwille.nl/contact/', icon: 'contact' },
  { label: 'Hulplijn', href: 'https://terwille.nl/hulplijn/', icon: 'contact' },
]

function MenuIcon({ name, small = false }: { name?: string; small?: boolean }) {
  if (!name) return null

  const cls = small ? 'tw-sub-icon' : 'tw-icon'

  switch (name) {
    case 'alcohol':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M82.67,135.31c.19-11.75.23-23.49-.02-35.25,45.78-4.35,35.38-66.29,24.18-97.05-.13-.84-.72-1.57-1.84-1.5-18.53,1.15-37.1.93-55.64.22-.63-.02-1.57.41-1.97,1.44-4.36,21.49-13.03,46.19-7.42,68.24,3.89,15.28,16.48,25.83,31.36,28.32.25,11.84.21,23.66.02,35.49-6.32.08-35.34.01-33.76,11.76,1.24,9.21,26.22,9.16,32.53,9.51,10.01.55,20.05-.1,29.93-1.75,3.99-.67,15.09-2.56,16.4-7.67,2.92-11.4-26.66-11.98-33.7-12.08Z" />
        </svg>
      )
    case 'gamen':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M158.13,96.84c-1.37-11.49-3.99-22.71-7.84-33.62-2.63-7.44-5.87-14.52-11.09-20.61-5.61-6.53-12.71-9.71-21.16-9.02-5.77.47-11.46,1.96-17.18,3.05-5.9,1.12-11.76,2.53-17.7,3.41-7.25,1.07-14.19-1.05-21.15-2.74-7.37-1.79-14.7-3.81-22.41-3.67-6.56.12-12.11,2.45-16.76,7.01-5.07,4.97-8.69,10.98-11.27,17.47C5.1,74.47,1.78,91.52,1.12,109.22c.18,2.83.26,5.78.59,8.71.46,4.01,1.4,7.92,3.7,11.34,2.76,4.1,6.64,5.74,11.53,5.13,4.06-.51,7.76-2.02,11.26-4.05,6.17-3.58,11.87-7.81,17.02-12.75,7.72-7.39,16.98-11.37,27.57-11.95,5.55-.3,11.15.05,16.71.37,6.12.35,11.94,1.99,16.93,5.64,5.27,3.85,10.34,7.99,15.46,12.05,5.64,4.48,11.49,8.57,18.62,10.37,7.04,1.77,12.24-.64,15.31-7.19.69-1.47,1.22-3.03,1.62-4.6,2.13-8.42,1.7-16.95.68-25.44Z" />
        </svg>
      )
    case 'gokken':
      return (
        <svg className={cls} viewBox="0 0 160 159.29" aria-hidden="true">
          <path fill="currentColor" d="M155.83,55.75l-67.81-14.61c-2.16-.47-4.31.92-4.77,3.08l-14.61,67.81c-.47,2.16.92,4.31,3.08,4.77l67.81,14.61c2.16.47,4.31-.92,4.77-3.08l14.61-67.81c.47-2.16-.92-4.31-3.08-4.77Z" />
          <path fill="currentColor" d="M73.12,18.57c-.79-2.06-3.13-3.1-5.19-2.3L3.2,41.21c-2.06.79-3.1,3.13-2.3,5.19l24.94,64.73c.79,2.06,3.13,3.1,5.19,2.3l32.74-12.62,15.43-66.47-6.08-15.78Z" />
        </svg>
      )
    case 'harddrugs':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M36.11,1.07c2.16.01,4.19,1.39,5.05,3.45.84,2,.4,4.01-1.22,5.66-2.83,2.88-5.66,5.77-8.48,8.66,9.49,9.31,18.96,18.6,28.5,27.96,1.02-1.03,2.02-2.05,3.02-3.06,3.89-3.96,7.78-7.93,11.67-11.89,1.26-1.28,3.05-1.29,4.32-.04,1.26,1.24,1.25,3.04,0,4.32-1.82,1.85-3.63,3.7-5.51,5.62,8.45,8.29,16.89,16.58,25.34,24.86,10.09,9.89,20.19,19.78,30.29,29.67,1.64,1.61,1.66,3.21.05,4.84-2.24,2.28-4.48,4.57-6.75,6.89,2.08,2.04,4.12,4.05,6.16,6.06,1.92,1.89,3.85,3.77,5.77,5.66,1.62,1.59,1.63,3.16.05,4.79-.37.39-.75.77-1.19,1.21,6.94,6.81,13.89,13.62,20.82,20.44,1.07,1.06,1.67,2.31,1.11,3.68-.59,1.44-2.44,1.86-3.66.69-1.35-1.28-2.66-2.61-3.99-3.91-5.74-5.63-11.47-11.26-17.21-16.89-.45.46-.89.92-1.34,1.36-1.39,1.39-3.06,1.42-4.47.04-3.54-3.46-7.07-6.93-10.61-10.39-.49-.48-.98-.95-1.5-1.46-1.78,1.82-3.52,3.59-5.27,5.37-.53.54-1.1,1.05-1.59,1.63-1.29,1.54-3.33,1.33-4.59.08-3.32-3.29-6.66-6.55-10-9.82-6.63-6.51-13.26-13.02-19.89-19.53-7.01-6.88-14.03-13.77-21.04-20.65-2.08-2.04-4.16-4.08-6.3-6.18-.59.59-1.16,1.16-1.71,1.72-1.29,1.31-2.57,2.63-3.86,3.94-1.23,1.25-3.03,1.28-4.27.08-1.27-1.23-1.31-3.07-.07-4.33,4.8-4.92,9.61-9.84,14.41-14.75-9.51-9.33-19-18.64-28.52-27.98-2.04,2.08-4.04,4.12-6.04,6.16-.93.94-1.87,1.87-2.77,2.84-1.39,1.51-3.08,2.07-5.06,1.55-2.06-.55-3.4-1.91-3.97-3.96-.5-1.82-.08-3.44,1.26-4.81C13.9,22.47,23.6,12.57,33.3,2.68c.32-.33.67-.63,1.01-.94.6-.22,1.2-.44,1.8-.66Z" />
        </svg>
      )
    case 'aanmelden':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M59,105.57h10.12v10.13c0,2.79,2.27,5.06,5.05,5.06h11.59c2.79,0,5.05-2.27,5.05-5.06v-10.13h10.13c2.79,0,5.05-2.27,5.05-5.05v-11.59c0-2.79-2.27-5.05-5.05-5.05h-10.13v-10.12c0-2.79-2.27-5.05-5.05-5.05h-11.59c-2.79,0-5.05,2.27-5.05,5.05v10.12h-10.12c-2.79,0-5.05,2.27-5.05,5.05v11.59c0,2.79,2.27,5.05,5.05,5.05Z" />
          <path fill="currentColor" d="M135.44,14.13h-70.64c-.33-7.02-6.14-12.63-13.24-12.63h-26.61C13.98,1.5,4.36,10.22,4.36,20.17v113.32c0,13.17,9.11,23.1,21.19,23.1h108.85c12.08,0,21.19-9.93,21.19-23.1V32.37c0-9.71-9.42-18.24-20.15-18.24Z" />
        </svg>
      )
    case 'kosten':
      return (
        <svg className={cls} viewBox="0 0 160 159.79" aria-hidden="true">
          <path fill="currentColor" d="M131.12,149.97c-4.8,2.97-16.91,9.83-39.77,9.83-16.45,0-33.14-4.34-44.79-13.48-6.86-5.49-18.28-17.6-19.65-38.62H7.03l10.74-20.57h9.14c.46-4.11.91-8.46,1.6-13.03H11.14l10.74-20.57h11.66c4.8-15.31,13.26-25.6,20.57-32.22C66.45,10.1,86.1.5,113.3.5c16.68,0,29.25,3.89,39.77,8.91l-16,29.48c-9.6-6.17-18.97-7.54-26.74-7.54-8.23,0-18.05,1.83-25.37,6.17-4.57,2.74-10.28,7.77-13.94,16h60.33l-10.74,20.57h-55.53c-1.14,4.57-1.6,8.91-1.37,13.03h50.96l-10.74,20.57h-38.85c1.6,8,6.17,13.03,10.97,16,7.77,5.03,18.05,5.26,22.17,5.26,21.03,0,32.45-9.37,37.25-13.94l-4.34,34.97Z" />
        </svg>
      )
    case 'naasten':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M132.26,63.76l-1.73-.79-1.37,1.69c-5.18,6.08-12.11,9.42-19.5,9.42-.74,0-1.48-.04-2.21-.11.6-1.54,1.11-3.14,1.51-4.8.24,0,.47.02.71.02,7.01,0,13.69-3.06,18.79-8.61,5.49-5.97,8.63-14.4,8.63-23.11,0-17.49-12.3-31.72-27.42-31.72-11.98,0-22.18,8.93-25.91,21.33-.67-.06-1.35-.09-2.03-.09-1.88,0-3.72.22-5.49.63-3.59-12.68-13.91-21.87-26.06-21.87-15.12,0-27.42,14.23-27.42,31.72,0,8.71,3.15,17.14,8.63,23.11,5.1,5.55,11.78,8.61,18.79,8.61,1.43,0,2.84-.13,4.23-.38.37,1.59.83,3.12,1.39,4.61-1.83.44-3.7.66-5.62.66-7.39,0-14.32-3.35-19.5-9.42l-1.38-1.69-1.73.79C10.83,71.18.33,87.46.33,105.22v11.19c0,4.51,3.66,8.17,8.17,8.17h142.72c4.51,0,8.17-3.66,8.17-8.17v-11.19c0-17.76-10.5-34.04-26.74-41.46Z" />
        </svg>
      )
    case 'clientenraad':
      return (
        <svg className={cls} viewBox="0 0 160 159.29" aria-hidden="true">
          <path fill="currentColor" d="M122.19,34c-3.87-16.51-14.05-27.53-30.4-31.74-16.49-4.24-31.11.23-42.22,13.27-10.96,12.87-13.19,27.67-6.66,43.38,2.49,6,6.06,11.54,8.63,17.51,1.94,4.52,3.28,9.34,4.51,14.13,2.64,10.3,2.72,14.84,8.03,18.49,5.21,3.58,13.01,5.83,19.9,7.81,7.17,2.06,12.11,3.53,11.65,5.03-.46,1.51-6.42.08-12.52-1.44-8.63-2.15-15.74-4.89-19.39-2.31-2.95,2.08-1.77,6.01,2.31,8.57,4.08,2.57,18.65,5.81,18.03,7.76-.62,1.95-10.42-1.31-15.8-3.07-8.87-2.9-12.77-4.19-14.79-2.85-2.02,1.34-1.36,4.36,1.98,7.69,3.54,3.52,15.73,6.55,18.64,8.61,2.9,2.05-5.27,2.58-12.34.57-4.75-1.35-9.03-2.97-9.07-2.98-.86-.33-1.83-.21-2.59.33-.76.53-1.2,1.4-1.18,2.33,0,.1.06,2.47.8,5.24,1.06,3.94,3.03,6.88,5.7,8.49,1.63.98,3.45,1.47,5.46,1.47,2.51,0,5.3-.77,8.37-2.3,1.37-.69,1.93-2.36,1.24-3.73-.69-1.37-2.36-1.93-3.73-1.24-3.69,1.85-6.53,2.2-8.45,1.04-1.6-.96-2.57-2.93-3.13-4.86,3.73,1.22,9.69,2.66,14.77,2.64,6.35-.02,8.5-2.99,7.53-6.43-.98-3.44-6.64-5.55-13.3-7.9-6.67-2.35-10.13-3.56-10.03-4.58.12-1.28,8.59,1.49,17.01,4.24,8.41,2.75,16.67,4.9,19.57,1.68,2.89-3.22-.96-7.19-8.37-10.21-7.4-3.03-18.62-4.95-18.62-6.4,0-1.45,8.35,1.57,16.6,3.69,8.25,2.11,15.17,3.1,17.42-.91,2.25-4.01-2.99-7.2-14.29-10.27-11.3-3.07-19.4-5.61-21.12-9.27-1.72-3.66-1.61-8.14-1.78-19.1-.17-10.97-.35-21.95-.35-30.18s-9.89-11.08-10.86-15.25c-.98-4.17.58-7.11,3.03-9.29,2.33-2.07,4.5-1.9,5.91-1.38,1.46.53,2.53,1.57,3.47,2.49,1.39,1.36,2.06,2.15,2.68,1.95.62-.2.98-1.58,1.44-3.29.41-1.53.87-3.27,1.9-4.72,1.43-2.04,3.58-2.99,6.2-2.75,2.34.22,4.17,1.37,5.28,3.33.81,1.42,1.09,3.02,1.32,4.31.4,2.22.56,3.63,1.43,3.74.88.12,2.31-1.57,3.46-2.81.89-.96,1.81-1.95,2.88-2.68,2.19-1.5,4.05-1.22,5.23-.71,2.29,1,3.78,2.85,4.2,5.23,1,5.67-4.33,12.84-6.45,14.88-4.56,4.67-11.63,6.05-11.93,6.1-1.56.3-3.07-.73-3.37-2.3-.29-1.56.73-3.07,2.29-3.36.06-.01,5.64-1.12,8.9-4.49,1.91-1.81,5.24-7.18,4.79-9.75-.06-.33-.17-.57-.51-.78-.52.35-1.41,1.31-1.92,1.86-1.58,1.7-3.51,3.79-6.13,3.79-.2,0-.4-.01-.61-.04-.94-.12-2.67-.64-3.64-2.82-.42-.94-.6-1.97-.78-2.97-.5-2.82-.78-2.84-1.46-2.9-.68-.06-.79.09-.95.32-.44.62-.76,1.83-1.04,2.9-.28,1.04-.56,2.11-1.03,3.08-.74,1.55-1.82,2.55-3.21,2.99-.99.31-2.54.46-4.29-.59-.89-.54-1.63-1.26-2.29-1.89-.36-.35-.94-.91-1.28-1.13-.04.02-.08.06-.13.1-.25.42-.55,1.9.44,3.01.99,1.12,2.47,2.31,4.02,3.57,3.89,3.14,8.3,6.7,8.3,11.73,0,8.23.34,29,.35,29.72.09,3.48,2.86,5.46,6.09,5.44,5.43-.03,7.99-1.99,9.29-7.21.49-1.98.82-4.01,1-6.04.69-7.75,2.79-15,6.72-21.78,2.43-4.19,4.54-8.58,6.6-12.97,3.94-8.36,5.13-17.14,3.02-26.16Z" />
        </svg>
      )
    case 'contact':
      return (
        <svg className={cls} viewBox="0 0 160 159.61" aria-hidden="true">
          <path fill="currentColor" d="M115.12.97H45.44c-8.52,0-15.45,6.93-15.45,15.45v126.64c0,8.51,6.93,15.45,15.45,15.45h69.67c8.52,0,15.45-6.93,15.45-15.45V16.41c0-8.51-6.93-15.45-15.45-15.45ZM80.28,145.29c-3.77,0-6.84-3.07-6.84-6.84s3.07-6.84,6.84-6.84,6.84,3.06,6.84,6.84-3.07,6.84-6.84,6.84ZM116.33,112.49c0,6.34-5.16,11.49-11.5,11.49h-49.1c-6.34,0-11.5-5.16-11.5-11.49V25.79c0-6.34,5.16-11.49,11.5-11.49h49.1c6.34,0,11.5,5.16,11.5,11.49v86.69Z" />
        </svg>
      )
    default:
      return null
  }
}

function MenuList({ items, className = '' }: { items: MenuNode[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label} className="tw-menu-item">
          <a href={item.href} target="_blank" rel="noreferrer" className="tw-menu-link">
            <MenuIcon name={item.icon} />
            {item.label}
          </a>
          {item.children && (
            <ul className="tw-submenu">
              {item.children.map((child) => (
                <li key={child.label}>
                  <a href={child.href} target="_blank" rel="noreferrer" className="tw-submenu-link">
                    <MenuIcon name={child.icon} small />
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function TerwilleMenuBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="tw-header-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

        .tw-header-wrap {
          font-family: 'Open Sans', Arial, sans-serif;
          width: 100%;
          position: relative;
          z-index: 100;
        }

        .tw-topbar {
          background: #ffffff;
          border-bottom: 1px solid #dfe6f2;
        }

        .tw-inner {
          max-width: 1220px;
          margin: 0 auto;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .tw-logo {
          display: block;
          background: #fff;
        }

        .tw-logo img {
          height: 50px;
          width: auto;
          display: block;
        }

        .tw-util {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
          justify-content: flex-end;
        }

        .tw-readspeaker {
          border: 1px solid #09529a;
          color: #09529a;
          border-radius: 4px;
          padding: 4px 10px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          white-space: nowrap;
        }

        .tw-topmenu,
        .tw-mainmenu {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: stretch;
          gap: 2px;
        }

        .tw-menu-item {
          position: relative;
          list-style: none;
        }

        .tw-menu-link {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 38px;
          padding: 0 10px;
          font-size: 14px;
          font-weight: 600;
          color: #09529a;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .tw-mainnav {
          background: #0069b4;
        }

        .tw-mainnav .tw-inner {
          padding-top: 0;
          padding-bottom: 0;
        }

        .tw-mainnav .tw-menu-link {
          color: #fff;
          min-height: 46px;
          font-size: 15px;
          font-weight: 700;
        }

        .tw-menu-item:hover > .tw-menu-link {
          color: #4cc6e8;
        }

        .tw-submenu {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          min-width: 250px;
          background: #fff;
          border: 1px solid #d7e1f0;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
          padding: 6px 0;
          margin: 0;
          z-index: 999;
        }

        .tw-menu-item:hover > .tw-submenu {
          display: block;
        }

        .tw-submenu li {
          list-style: none;
        }

        .tw-submenu-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          color: #09529a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .tw-icon {
          width: 16px;
          height: 16px;
          color: currentColor;
          flex: 0 0 auto;
        }

        .tw-sub-icon {
          width: 14px;
          height: 14px;
          color: #0069b4;
          flex: 0 0 auto;
        }

        .tw-submenu-link:hover {
          background: #f1f6fc;
        }

        .tw-search {
          border: 1px solid #b8cae4;
          border-radius: 100px;
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #09529a;
          background: #fff;
          font-size: 16px;
        }

        .tw-mobile-toggle {
          display: none;
          border: 1px solid #09529a;
          background: #fff;
          color: #09529a;
          border-radius: 4px;
          padding: 6px 10px;
          font-weight: 700;
          font-size: 13px;
        }

        .tw-mobile-panel {
          display: none;
          border-top: 1px solid #d7e1f0;
          background: #fff;
          padding: 10px 16px 14px;
        }

        .tw-mobile-panel a {
          color: #09529a;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          display: block;
          padding: 8px 0;
        }

        @media (max-width: 1100px) {
          .tw-util,
          .tw-mainnav {
            display: none;
          }

          .tw-mobile-toggle {
            display: inline-flex;
          }

          .tw-mobile-panel {
            display: block;
          }
        }
      `}</style>

      <div className="tw-topbar">
        <div className="tw-inner">
          <a href="https://terwille.nl" target="_blank" rel="noreferrer" className="tw-logo">
            <img
              src="https://terwille.nl/wp-content/uploads/elementor/thumbs/Logo-Terwille-quv3ffjb1m15we0fi4hoyd4okjrgf9ca20xl99s2hs.jpg"
              alt="Terwille"
            />
          </a>

          <button
            type="button"
            className="tw-mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
          >
            ☰ MENU
          </button>

          <div className="tw-util">
            <a
              className="tw-readspeaker"
              href="https://app-eu.readspeaker.com/cgi-bin/rsent?customerid=13887&lang=nl_nl&readid=readspeaker-start&url=https%3A%2F%2Fterwille.nl%2Flocaties%2F"
              target="_blank"
              rel="noreferrer"
            >
              Lees Voor
            </a>

            <MenuList items={topMenu} className="tw-topmenu" />

            <button type="button" className="tw-search" aria-label="Zoeken">
              🔍
            </button>
          </div>
        </div>
      </div>

      <nav className="tw-mainnav" aria-label="Hoofdmenu">
        <div className="tw-inner">
          <MenuList items={mainMenu} className="tw-mainmenu" />
        </div>
      </nav>

      {mobileOpen && (
        <div className="tw-mobile-panel">
          {[...topMenu, ...mainMenu].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default TerwilleMenuBar