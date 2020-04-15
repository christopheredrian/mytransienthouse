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

                <a class="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div class="nav-link-icon"><i data-feather="layout"></i></div>
                    Photos
                    <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i>
                    </div>
                </a>

                <div class="collapse" id="collapseLayouts" data-parent="#accordionSidenav">
                    <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                        <a class="nav-link" href="layout-static.html">Static Navigation</a><a class="nav-link" href="layout-dark.html">Dark Sidenav</a><a class="nav-link" href="layout-rtl.html">RTL Layout</a
                        ><a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayoutsPageHeaders" aria-expanded="false" aria-controls="collapseLayoutsPageHeaders"
                        >Page Headers
                            <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div
                            ></a>
                        <div class="collapse" id="collapseLayoutsPageHeaders" data-parent="#accordionSidenavLayout">
                            <nav class="sidenav-menu-nested nav"><a class="nav-link" href="header-simplified.html">Simplified</a><a class="nav-link" href="header-overlap.html">Content Overlap</a><a class="nav-link" href="header-breadcrumbs.html">Breadcrumbs</a><a class="nav-link" href="header-light.html">Light</a></nav>
                        </div>
                    </nav>
                </div>

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
