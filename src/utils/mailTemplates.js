const EMAIL_TEMPLATES = {
  RESET_PASSWORD_LINK: {
    subject: 'Đặt lại mật khẩu',
    text: ({ resetLink }) => `
        Xin chào,
  
        Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.
  
        Nhấn vào liên kết bên dưới để đặt lại mật khẩu:
        ${resetLink}
  
        Nếu bạn không yêu cầu thay đổi mật khẩu, bạn có thể bỏ qua email này.
  
        Cảm ơn bạn,
        Nhóm Hỗ Trợ
      `,
    html: ({ resetLink }) =>
      BASE_EMAIL_TEMPLATE({
        title: 'Đặt lại mật khẩu',
        content: `
            <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
            <p>Nhấn vào liên kết bên dưới để đặt lại mật khẩu của bạn:</p>
            <a href="${resetLink}" class="button">Đặt lại mật khẩu</a>
            <p>Nếu bạn không yêu cầu thay đổi mật khẩu, bạn có thể bỏ qua email này.</p>
          `
      })
  },
  OTP: {
    subject: 'Mã OTP của bạn',
    text: ({ otp }) => `
        Xin chào,
  
        Để xác thực tài khoản của bạn, hãy sử dụng mã OTP sau:
        ${otp}
  
        Vui lòng không chia sẻ mã này với bất kỳ ai khác.
  
        Nếu bạn không yêu cầu mã OTP này, bạn có thể bỏ qua email này.
  
        Cảm ơn bạn,
        Nhóm Hỗ Trợ
      `,
    html: ({ otp }) =>
      BASE_EMAIL_TEMPLATE({
        title: 'Mã OTP của bạn',
        content: `
            <p>Để xác thực tài khoản của bạn, hãy sử dụng mã OTP sau:</p>
            <p class="otp">${otp}</p>
            <p>Vui lòng không chia sẻ mã này với bất kỳ ai khác.</p>
          `
      })
  }
};

/**
 * Mẫu email cơ bản để tái sử dụng
 * @param {Object} params
 * @param {string} params.title - Tiêu đề của email
 * @param {string} params.content - Nội dung HTML chính của email
 * @returns {string} - Chuỗi HTML hoàn chỉnh
 */
function BASE_EMAIL_TEMPLATE({ title, content }) {
  return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              .header {
                  font-size: 24px;
                  margin-bottom: 20px;
                  text-align: center;
                  color: #333333;
              }
              .content {
                  font-size: 16px;
                  line-height: 1.5;
                  color: #555555;
              }
              .button {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 15px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .otp {
                  font-size: 20px;
                  font-weight: bold;
                  color: #007bff;
              }
              .footer {
                  font-size: 12px;
                  color: #777777;
                  text-align: center;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">${title}</div>
              <div class="content">
                  ${content}
              </div>
              <div class="footer">
                  <p>Cảm ơn bạn,</p>
                  <p>Nhóm Hỗ Trợ</p>
              </div>
          </div>
      </body>
      </html>
    `;
}

export default EMAIL_TEMPLATES;
