import {Outlet} from 'react-router-dom';

import '../assets/common.css';
import '../assets/layout.css';

export default function Layout() {
    return (<>
        <header id="layout_header">
            <h1>Trinity</h1>
            <div id="layout_header_menu">
                <span>a@a.jp</span>
                <a href="{{ route('admin.auth.logout') }}">Logout</a>
                <a href="#">Logout</a>
            </div>
        </header>

        <div id="layout_wrapper">
            <nav className="layout_sidebar">
                <ul className="layout_sidebar">
                    <li className="layout_sidebar">
                        <a  className="layout_sidebar" href="{{ route('companies.index') }}">利用企業</a>
                    </li>
                    <li className="layout_sidebar">
                        <a className="layout_sidebar" href="{{ route('administrators.index') }}">管理者</a>
                    </li>
                </ul>
            </nav>

            <main id="layout_main">
                <Outlet />
            </main>
        </div>
    </>

    )
}