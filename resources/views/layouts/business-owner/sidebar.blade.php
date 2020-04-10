<div id="layoutSidenav_nav">
    <nav class="sidenav shadow-right sidenav-light">
        <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">
                <div class="sidenav-menu-heading">Management</div>
                <a class="nav-link" href="{{url('bo')}}">
                    <div class="nav-link-icon"><i data-feather="activity"></i></div>
                    Dashboard
                </a>

                <a class="nav-link" href="{{url('bo/photos')}}">
                    <div class="nav-link-icon"><i data-feather="camera"></i></div>
                    Photos
                </a>
                <a class="nav-link" href="{{url('bo/faqs')}}">
                    <div class="nav-link-icon"><i data-feather="help-circle"></i></div>
                    FAQs
                </a>
            </div>
        </div>
        <div class="sidenav-footer">
            <div class="sidenav-footer-content">
                <div class="sidenav-footer-subtitle">Logged in as:</div>
                <div class="sidenav-footer-title">{{ Auth::user()->name }}</div>
            </div>
        </div>
    </nav>
</div>
