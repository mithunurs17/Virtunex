import nodemailer from 'nodemailer';

// Email configuration using GoDaddy SMTP
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net', // GoDaddy SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'hr@virtunextechsolutions.com',
    pass: 'virtunextechsolutions@2025',
  },
});

export interface EmailData {
  fullName: string;
  email: string;
  college: string;
  branchName?: string;
  batchName?: string;
  projectTitle?: string;
  whatsapp: string;
  yop: string;
}

export const sendInternshipOfferEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const offerLetterHtml = generateOfferLetterHTML(data);
    
    const mailOptions = {
      from: '"VirtuNex Tech Solutions - HR Department" <hr@virtunextechsolutions.com>',
      to: data.email,
      subject: '🎉 Congratulations! Your Internship Offer Letter from VirtuNex Tech Solutions',
      html: offerLetterHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Internship offer email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending internship offer email:', error);
    return false;
  }
};

const generateOfferLetterHTML = (data: EmailData): string => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internship Offer Letter</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 1px;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 40px;
        }
        .offer-badge {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-align: center;
            margin-bottom: 30px;
            font-size: 18px;
            font-weight: 600;
        }
        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .detail-item {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .detail-label {
            font-weight: 600;
            color: #64748b;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .detail-value {
            font-size: 16px;
            color: #1e293b;
            font-weight: 500;
        }
        .next-steps {
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        .next-steps h3 {
            color: #1e40af;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 20px;
        }
        .next-steps li {
            margin-bottom: 10px;
            color: #334155;
        }
        .contact-info {
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            margin-top: 30px;
        }
        .contact-info h3 {
            color: #1e293b;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .contact-item {
            display: flex;
            align-items: center;
            color: #475569;
        }
        .contact-item strong {
            color: #1e293b;
        }
        .footer {
            background: #1e293b;
            color: white;
            padding: 25px;
            text-align: center;
        }
        .footer p {
            margin: 0;
            opacity: 0.8;
        }
        .congratulations {
            text-align: center;
            margin-bottom: 30px;
        }
        .congratulations h2 {
            color: #1e293b;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .congratulations p {
            color: #64748b;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>VirtuNex Tech Solutions</h1>
            <p>Empowering Future Tech Leaders</p>
        </div>
        
        <div class="content">
            <div class="offer-badge">
                🎉 INTERNSHIP OFFER LETTER
            </div>
            
            <div class="congratulations">
                <h2>Congratulations, ${data.fullName}!</h2>
                <p>We are delighted to offer you an internship position with VirtuNex Tech Solutions.</p>
            </div>
            
            <p style="color: #64748b; margin-bottom: 30px;">Date: ${currentDate}</p>
            
            <p>Dear ${data.fullName},</p>
            
            <p>We are pleased to inform you that your enrollment for our internship program has been successfully completed. Based on your academic background and our assessment, we are excited to offer you an internship opportunity with VirtuNex Tech Solutions.</p>
            
            <div class="details-grid">
                <div class="detail-item">
                    <div class="detail-label">Candidate Name</div>
                    <div class="detail-value">${data.fullName}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Email Address</div>
                    <div class="detail-value">${data.email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">College/Institution</div>
                    <div class="detail-value">${data.college}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Year of Passing</div>
                    <div class="detail-value">${data.yop}</div>
                </div>
                ${data.branchName ? `
                <div class="detail-item">
                    <div class="detail-label">Branch/Department</div>
                    <div class="detail-value">${data.branchName}</div>
                </div>
                ` : ''}
                ${data.projectTitle ? `
                <div class="detail-item">
                    <div class="detail-label">Project Assignment</div>
                    <div class="detail-value">${data.projectTitle}</div>
                </div>
                ` : ''}
                ${data.batchName ? `
                <div class="detail-item">
                    <div class="detail-label">Batch Assignment</div>
                    <div class="detail-value">${data.batchName}</div>
                </div>
                ` : ''}
                <div class="detail-item">
                    <div class="detail-label">WhatsApp Contact</div>
                    <div class="detail-value">${data.whatsapp}</div>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>📋 Next Steps</h3>
                <ul>
                    <li><strong>Check your candidate dashboard</strong> for batch assignments and project details</li>
                    <li><strong>Join our WhatsApp group</strong> for important updates and communications</li>
                    <li><strong>Prepare for your internship</strong> by reviewing the project requirements</li>
                    <li><strong>Stay tuned</strong> for further instructions from your batch coordinator</li>
                </ul>
            </div>
            
            <p>This internship will provide you with hands-on experience in cutting-edge technologies and real-world project development. You will be working alongside experienced professionals and will have the opportunity to contribute to meaningful projects.</p>
            
            <p>We look forward to having you as part of the VirtuNex family and are excited to see your contributions to our innovative projects.</p>
            
            <div class="contact-info">
                <h3>📞 Contact Information</h3>
                <div class="contact-grid">
                    <div class="contact-item">
                        <strong>Email:</strong>&nbsp;contact@virtunex.com
                    </div>
                    <div class="contact-item">
                        <strong>HR Email:</strong>&nbsp;hr@virtunex.com
                    </div>
                    <div class="contact-item">
                        <strong>WhatsApp:</strong>&nbsp;+91 90000 00000
                    </div>
                    <div class="contact-item">
                        <strong>Website:</strong>&nbsp;www.virtunex.com
                    </div>
                </div>
            </div>
            
            <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The VirtuNex Tech Solutions Team</strong><br>
                <em>HR Department</em>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 VirtuNex Tech Solutions. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

// Test email function (for development)
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
};
