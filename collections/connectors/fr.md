---
lang: fr
title: Silex Dashboard - login page
title2: Bienvenue sur Silex
subtitle: Connectez-vous pour continuer
recommended: Recommandé et gratuit
advanced_users: Utilisateurs avancés
help: Avez-vous besoin d'aide ? Consultez <a href="https://docs.silex.me/fr/user/login" target="_blank">la documentation</a>.
connectors:
  - name: GitLab
    text: Se connecter avec GitLab.com
    auth_url: /api/connector/login?connectorId=gitlab&type=STORAGE
    description: >-
      Gitlab.com est le service que nous recommandons pour héberger votre site
      web Silex. Nous faisons confiance à l'entreprise derrière ce service, <a
      href="https://about.gitlab.com/fr-fr/" title="entreprise GitLab">allez les
      voir</a>.
    icon: >-
      <svg xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        width="100%" height="100%" viewBox="0 0 1000 963.197" version="1.1" id="svg85">
        <sodipodi:namedview id="namedview87" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" showgrid="false" inkscape:zoom="1" inkscape:cx="991.5" inkscape:cy="964.5" inkscape:window-width="1126" inkscape:window-height="895" inkscape:window-x="774" inkscape:window-y="12" inkscape:window-maximized="0" inkscape:current-layer="svg85" />
        <defs id="defs74">
          <!-- Styles will be applied inline -->
        </defs>
        <g id="LOGO" transform="matrix(5.2068817,0,0,5.2068817,-489.30756,-507.76085)">
          <path class="cls-1" style="fill:#e24329;" d="m 282.83,170.73 -0.27,-0.69 -26.14,-68.22 a 6.81,6.81 0 0 0 -2.69,-3.24 7,7 0 0 0 -8,0.43 7,7 0 0 0 -2.32,3.52 l -17.65,54 h -71.47 l -17.65,-54 a 6.86,6.86 0 0 0 -2.32,-3.53 7,7 0 0 0 -8,-0.43 6.87,6.87 0 0 0 -2.69,3.24 L 97.44,170 l -0.26,0.69 a 48.54,48.54 0 0 0 16.1,56.1 l 0.09,0.07 0.24,0.17 39.82,29.82 19.7,14.91 12,9.06 a 8.07,8.07 0 0 0 9.76,0 l 12,-9.06 19.7,-14.91 40.06,-30 0.1,-0.08 a 48.56,48.56 0 0 0 16.08,-56.04 z" id="path76" />
          <path class="cls-2" style="fill:#fc6d26;" d="m 282.83,170.73 -0.27,-0.69 a 88.3,88.3 0 0 0 -35.15,15.8 L 190,229.25 c 19.55,14.79 36.57,27.64 36.57,27.64 l 40.06,-30 0.1,-0.08 a 48.56,48.56 0 0 0 16.1,-56.08 z" id="path78" />
          <path class="cls-3" style="fill:#fca326;" d="m 153.43,256.89 19.7,14.91 12,9.06 a 8.07,8.07 0 0 0 9.76,0 l 12,-9.06 19.7,-14.91 c 0,0 -17.04,-12.89 -36.59,-27.64 -19.55,14.75 -36.57,27.64 -36.57,27.64 z" id="path80" />
          <path class="cls-2" style="fill:#fc6d26;" d="M 132.58,185.84 A 88.19,88.19 0 0 0 97.44,170 l -0.26,0.69 a 48.54,48.54 0 0 0 16.1,56.1 l 0.09,0.07 0.24,0.17 39.82,29.82 c 0,0 17,-12.85 36.57,-27.64 z" id="path82" />
        </g>
      </svg>
    color: '#2B1B63'
    background_color: 'rgba(252, 109, 38, 0.2)'
  - name: Framagit
    text: Se connecter avec framagit.org
    auth_url: /api/connector/login?connectorId=framagit&type=STORAGE
    description: >-
      Framagit est la forge logicielle de Framasoft reposant sur le logiciel Gitlab.
      Elle est ouverte à tous, dans la limite de 42 projets par personne. Les projets peuvent être publics ou privés.
      Avec Gitlab, nous proposons aussi de l'intégration continue avec GitlabCI et l'hébergement de pages statiques avec Gitlab Pages (voir notre documentation)
    icon: >-
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.29 14.29"><g fill="#725794" transform="matrix(.02569 0 0 .02569 -.25 -.08)"><circle cx="74.91" cy="180.35" r="55"/><circle cx="137.6" cy="317.44" r="42.5"/><circle cx="189.82" cy="434.27" r="31"/></g><g fill="#dd6418" transform="matrix(.02569 0 0 .02569 -.25 -.08)"><circle cx="515.92" cy="412.86" r="26"/><circle cx="499.71" cy="484.31" r="21"/></g><path fill="#dd6418" d="M12.24 3.93c-.15.05-.64-.02-.64-.02.14.09.23.33.22.5-.48-.06-.67-.22-1.11-.45 0 0 .3.36.6.57.54.41 1.03.9 1.33 1.37.15.23.19.26.2.16a3.3 3.3 0 00-.52-1.87c-.06-.09-.07-.19-.08-.26z"/><path d="M.68.2C.53.2.45.33.56.43 5.51 2.78 4.78 5 5.42 7.55c.17.69 1.32 6.06 7.37 6.58.23.02.3-.25.06-.31-4.94-1.32-6.13-9.95-2.68-10.27.48-.04.63.16 1 .28.36.12.93.16 1.1.13.32-.6-.25-1.28-.73-1.78.52-.34 2.2-.71 2.4-.8.13-.05.07-.25-.04-.27-.77.05-2.6.2-3.43.52-1.45-.88-3.34-.2-4.3 1.3C5.19 1.5 3.81 1.08.67.2zM8.8 1.54c.74 0 .72.31-.24.64a3.76 3.76 0 00-2.38 2.2c-.11-.17.43-2.56 2.62-2.84z"/></svg>
    color: '#2B1B63'
    background_color: 'rgba(252, 109, 38, 0.2)'
  - name: FTP
    text: Se connecter avec un FTP
    auth_url: /api/connector/login?connectorId=ftp&type=STORAGE
    description: >
      FTP est destiné aux utilisateurs professionnels qui souhaitent héberger
      leurs sites web avec une société d'hébergement de leur choix.
    icon: >-
      <svg xmlns='http://www.w3.org/2000/svg' height='100%' viewBox='0 0 512
      512'>   <path d='M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64
      64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1
      0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64
      288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7
      64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1
      0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z' /> </svg>
    color: '#ffffff'
    background_color: '#0066CC'
---

