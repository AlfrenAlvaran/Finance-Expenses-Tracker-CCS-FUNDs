export const emailTemplate = (verificationLink) => {
    return `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <table align="center" width="600" style="background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
          <tr>
            <td align="center">
              <h2 style="color: #333;">Welcome to Our Platform</h2>
              <p style="color: #666;">You're almost there! Click the button below to verify your email address.</p>
              <a href="${verificationLink}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
                 Verify Your Email
              </a>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                If you did not sign up, please ignore this email. This link expires in 24 hours.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
  };
  