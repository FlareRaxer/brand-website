import Link from 'next/link';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Forside</Link></li>
        <li><Link href="/projekter">Projekter</Link></li>
        <li><Link href="/cv">CV</Link></li>
        <li><Link href="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
