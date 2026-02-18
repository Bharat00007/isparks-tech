 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 import nodemailer from "nodemailer";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface EnquiryRequest {
   fullName: string;
   email: string;
   phone?: string;
   company?: string;
   service?: string;
   message?: string;
   source: "contact" | "popup";
 }
 
 const handler = async (req: Request): Promise<Response> => {
   // Handle CORS preflight requests
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const data: EnquiryRequest = await req.json();
     
     // Validate required fields
     if (!data.fullName || !data.email) {
       throw new Error("Full name and email are required");
     }
 
     // Create transporter with Hostinger SMTP settings
     const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
     const isSecurePort = smtpPort === 465;
     
     const transporter = nodemailer.createTransport({
       host: Deno.env.get("SMTP_HOST"),
       port: smtpPort,
       secure: isSecurePort, // true for 465, false for other ports
       tls: {
         rejectUnauthorized: false,
         ciphers: 'SSLv3',
       },
       auth: {
         user: Deno.env.get("SMTP_USER"),
         pass: Deno.env.get("SMTP_PASSWORD"),
       },
     });
 
     const sourceLabel = data.source === "popup" ? "Popup Enquiry Form" : "Contact Section Form";
     
     // Email HTML content
     const htmlContent = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
         <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
           <h1 style="color: white; margin: 0; font-size: 24px;">New Enquiry from iSparks Website</h1>
           <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Source: ${sourceLabel}</p>
         </div>
         
         <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
           <table style="width: 100%; border-collapse: collapse;">
             <tr>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 140px;">Full Name:</td>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.fullName}</td>
             </tr>
             <tr>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                 <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a>
               </td>
             </tr>
             ${data.phone ? `
             <tr>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Phone:</td>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                 <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a>
               </td>
             </tr>
             ` : ''}
             ${data.company ? `
             <tr>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Company:</td>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.company}</td>
             </tr>
             ` : ''}
             ${data.service ? `
             <tr>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Service Interested:</td>
               <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                 <span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${data.service}</span>
               </td>
             </tr>
             ` : ''}
           </table>
           
           ${data.message ? `
           <div style="margin-top: 20px;">
             <p style="font-weight: bold; color: #475569; margin-bottom: 10px;">Message:</p>
             <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #1e293b; line-height: 1.6;">
               ${data.message.replace(/\n/g, '<br>')}
             </div>
           </div>
           ` : ''}
         </div>
         
         <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
           This email was sent from the iSparks Tech website enquiry form.
         </p>
       </div>
     `;
 
     // Send email
     const info = await transporter.sendMail({
       from: `"iSparks Website" <${Deno.env.get("SMTP_USER")}>`,
       to: "sales@isparkstech.com",
       subject: `New Enquiry: ${data.fullName} - ${data.service || 'General Inquiry'}`,
       html: htmlContent,
       replyTo: data.email,
     });
 
     console.log("Email sent successfully:", info.messageId);
 
     return new Response(
       JSON.stringify({ success: true, messageId: info.messageId }),
       {
         status: 200,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   } catch (error: any) {
     console.error("Error sending enquiry email:", error);
     return new Response(
       JSON.stringify({ error: error.message }),
       {
         status: 500,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   }
 };
 
 serve(handler);