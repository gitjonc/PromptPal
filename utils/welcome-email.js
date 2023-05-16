// const mailer = require("../config/nodemailer.config");

module.exports = ({ to, username }) =>
  mailer.sendMail({
    from: `PromptPal ${process.env.EMAIL}`,
    to,
    subject: "Bienvenido a PromptPal 🚀",
    html: `<!DOCTYPE html>

      <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
      
          .image_block img+div {
            display: none;
          }
      
          @media (max-width:520px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }
      
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .image_block img.big,
            .row-content {
              width: 100% !important;
            }
      
            .mobile_hide {
              display: none;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
      
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
      <div align="center" class="alignment" style="line-height:10px"><img class="big" src="https://res.cloudinary.com/dpgekn8yk/image/upload/v1684088724/P27-11697_qjvtgj.jpg" style="display: block; height: auto; border: 0; width: 500px; max-width: 100%;" width="500"/></div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td class="pad" style="width:100%;text-align:center;">
      <h1 style="margin: 0; color: #555555; font-size: 23px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Hola ${username}, </span></h1>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td class="pad">
      <div style="color:#000000;font-size:14px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
      <p style="margin: 0; margin-bottom: 16px;">En nombre de todo el equipo de PromptPal, nos complace darte la más cordial bienvenida a nuestra plataforma. Estamos encantados de tenerte como parte de nuestra comunidad.</p>
      <p style="margin: 0; margin-bottom: 16px;">En PromptPal, nos dedicamos a brindarte herramientas y recursos innovadores para impulsar tu creatividad y productividad. Nuestro objetivo es proporcionarte una experiencia excepcional mientras te ayudamos a desarrollar tus habilidades de escritura y superar cualquier bloqueo creativo.</p>
      <p style="margin: 0; margin-bottom: 16px;">Queremos que te sientas como en casa aquí, explorando nuestras diversas funciones y aprovechando al máximo tu membresía. Si tienes alguna pregunta, inquietud o simplemente deseas compartir tus ideas, no dudes en contactarnos. Estamos aquí para ayudarte en cualquier momento.</p>
      <p style="margin: 0; margin-bottom: 16px;">Queremos destacar que no es necesario que respondas a este correo electrónico. Sin embargo, si tienes alguna pregunta urgente o deseas comentarnos algo personalmente, estaremos encantados de recibir tu mensaje. Y, si por alguna razón te sientes especialmente generoso o simplemente amante del jamón ibérico, nos atrevemos a sugerirte que, en caso de insistir en responder este email, un jamón ibérico de la zona de La Alberca será recibido con una sonrisa y gratitud.</p>
      <p style="margin: 0; margin-bottom: 16px;">Una vez más, queremos darte las gracias por unirte a la familia de PromptPal. Esperamos que disfrutes de tu experiencia con nosotros y que encuentres nuestro contenido valioso y enriquecedor.</p>
      <p style="margin: 0; margin-bottom: 16px;">¡Que tengas un día lleno de inspiración y éxito!</p>
      <p style="margin: 0; margin-bottom: 16px;">Atentamente,</p>
      <p style="margin: 0;">El equipo de PromptPal</p>
      </div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>  
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table><!-- End -->
      </body>
      </html>`,
  });
