import Link from 'next/link'
export default ({ currentUser }) => {
    const isLoggedIn = currentUser !== undefined && currentUser != null;
    console.log('isLoggedIn: ' + isLoggedIn)
    const links = [
        { label: 'Sign Up', href: '/auth/signup', visible: !isLoggedIn },
        { label: 'Sign In', href: '/auth/signin', visible: !isLoggedIn },
        { label: 'Sign Out', href: '/auth/signout', visible: isLoggedIn }
    ]
    console.log(links)
    console.log(links.filter(x => x.visible == true))

    return <nav className="navbar navbar-dark bg-dark px-3">
        <Link legacyBehavior href="/">
            <a className='navbar-brand'>Ticket Trade</a>
        </Link>
        <div className='d-flex justify-content-end'>
            <ul  className='nav d-flex align-items-center text-light '>
                {links.filter(x => x.visible == true).map(link => (
                    <li key={link.label} className='nav-item px-2'>

                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
}