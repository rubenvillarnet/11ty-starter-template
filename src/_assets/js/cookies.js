//Cookies habilitadas por defecto
var ocultarMensaje =
  typeof ocultarMensajeCookies !== 'undefined' && ocultarMensajeCookies;
var cookiesHabilitadasPorDefecto = true;
var colorFondo = '#000';
var colorBorde = '#e2e2e2';
var colorTexto = '#fff';
var colorFondoBoton = '#e2e2e2';
var colorTextoBoton = '#000';

if (typeof urlCookies === 'undefined') urlCookies = '';
if (typeof debugConsole === 'undefined') debugConsole = false;
if (typeof dataLayer === 'undefined') dataLayer = [];

var changeCookies = function (enable) {
  if (enable) {
    consentGiven();
  }
  if (!enable) {
    deleteAllCookies();
  }
};
//Evento a GTM: s�lo env�o el evento una vez
var eventoEnviado = false;
var consentGiven = function () {
  if (dataLayer !== undefined && !eventoEnviado) {
    dataLayer.push({ event: 'consent_given' });
    dataLayer.push({ cookie_consent: 'true' });
    eventoEnviado = true;
    if (debugConsole) console.log('consentGiven enviado');
  }
};

var deleteAllCookies = function () {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    var borrar = name.replace(' ', '') != 'cookieconsent_status';
    if (borrar) {
      if (debugConsole) console.log('borro', name);
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie =
        name +
        '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.' +
        location.hostname.replace(/^www\./i, '');
    }
  }
  if (debugConsole) console.log('deleteAllCookies', document.cookie.split(';'));
};

var getCookie = function (name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
};

var cookieConsent = getCookie('cookieconsent_status');
var nomostrarMensajeCookies =
  ocultarMensaje || (cookieConsent && cookieConsent.length); //cookieConsent == 'allow';

if (cookiesHabilitadasPorDefecto) {
  var consent = getCookie('cookieconsent_status');
  if (!consent) {
    consentGiven();
  }
}
if (!nomostrarMensajeCookies) {
  window.addEventListener('load', function () {
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: colorFondo,
          text: colorTexto,
          border: colorBorde,
        },
        button: {
          background: colorFondoBoton,
          text: colorTextoBoton,
        },
      },
      position: 'bottom-right',
      type: cookiesHabilitadasPorDefecto ? 'opt-out' : 'opt-in',
      content: {
        message:
          'Utilizamos cookies para ofrecer a nuestros visitantes una forma m&aacute;s c&oacute;moda y eficiente a la hora de navegar por nuestra p&aacute;gina web. Al utilizar nuestra p&aacute;gina web acepta el uso de cookies; puede obtener m&aacute;s informaci&oacute;n sobre las cookies y su uso en la secci&oacute;n pol&iacute;tica de cookies o en el siguiente enlace:',
        dismiss: 'Aceptar',
        allow: 'Aceptar',
        deny: 'Rechazar',
        link: 'pol&iacute;tica de cookies',
        href: urlCookies,
      },
      onInitialise: function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        //Temporal
        if (debugConsole) {
          console.log('onInitialise - type', type);
          console.log('onInitialise - didConsent', didConsent);
        }
        if (type == 'opt-in' && didConsent) {
          // enable cookies
          changeCookies(true);
        }
        if (type == 'opt-out') {
          // disable cookies
          changeCookies(didConsent);
        }

        //if (didConsent && cookiesHabilitadasPorDefecto)
      },
      onStatusChange: function (status, chosenBefore) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (debugConsole) {
          console.log('onStatusChange - type', type);
          console.log('onStatusChange - didConsent', didConsent);
        }
        if (type == 'opt-in' && didConsent) {
          // enable cookies
          changeCookies(true);
        }
        if (type == 'opt-out' && !didConsent) {
          // disable cookies
          changeCookies(false);
        }
      },
      onRevokeChoice: function () {
        var type = this.options.type;
        if (debugConsole) console.log('onRevokeChoice - type', type);
        //if (type == 'opt-in') {
        //    // disable cookies
        //    changeCookies(false);
        //}
        //if (type == 'opt-out') {
        //    // enable cookies
        //    changeCookies(true);
        //}
      },
    });
  });
}
