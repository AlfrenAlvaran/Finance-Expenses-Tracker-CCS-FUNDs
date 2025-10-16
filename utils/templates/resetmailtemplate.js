export const resetPasswordTemplates = (code) => {
    return `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <table align="center" width="600" style="background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
          <tr>
            <td align="center">
              <h2 style="color: #333;">Email Verification Code</h2>
              <p style="color: #666;">Use the 6-digit code below to verify your email address:</p>
              <div style="font-size: 32px; letter-spacing: 10px; font-weight: bold; margin: 20px 0; color: #007bff;">
                ${code}
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                This code will expire in 10 minutes. If you didn’t request this, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
  };
  