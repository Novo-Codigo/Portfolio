import Logo from '@/components/logo';

export default function Header() {
  return (
    <header>
      <Logo />

      <nav>
        <ul>
          <li>
            <a href='#home'>Home</a>
          </li>
          <li>
            <a href='#about'>About</a>
          </li>
          <li>
            <a href='#services'>Services</a>
          </li>
          <li>
            <a href='#projects'>Projects</a>
          </li>
          <li>
            <a href='#protocol'>Protocol</a>
          </li>
          <li>
            <a href='#contacts'>Contacts</a>
          </li>
        </ul>
      </nav>

      <button>
        Book a Call
      </button>
    </header>
  );
}
