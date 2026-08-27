"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h4 className="text-2xl md:text-3xl font-bold text-[#085D36]">{title}</h4>
      <div className="space-y-4 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/about.webp"
          alt="Privacy Policy Banner"
          fill
          className="object-cover"
          priority
        />
      </section> */}



      <section className="bg-gray-50 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h3 className="section-title-spl text-center text-[#062516] mb-10">
            Privacy Policy
          </h3>

          <div className="mb-8 space-y-1 text-gray-600">
            <p>Effective Date: [12 June 2026]</p>
            <p>Last Updated: [12 June 2026]</p>
          </div>

          <div className="space-y-8">
            <PolicySection title="1. Introduction">
              <p>
                This Privacy Policy explains how JIVO ENERGY PVT LTD, having its registered office at 108–111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurugram, Haryana, India (&quot;JIVO Energy&quot;, &quot;JIVO&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot;), and where applicable its group entities, affiliates and offices, collect, use, disclose, transfer, retain and protect personal information when you visit www.jivoenergy.com, submit an enquiry, apply for a role, interact with us for business purposes, or otherwise engage with our website and services.
              </p>
              <p>
                For the purposes of applicable data-protection laws, JIVO Energy will be the body corporate / data fiduciary / controller that determines the purposes and means of processing personal information collected through the website, unless a specific notice states otherwise.
              </p>
              <p>
                Providing personal information through the website is voluntary. However, if you do not provide information requested in a contact, enquiry or careers form, we may be unable to respond to your enquiry, evaluate your application, or provide the requested information.
              </p>
            </PolicySection>

            <PolicySection title="2. Information We Collect">
              <p>We may collect the following categories of personal information, depending on how you interact with us:</p>
              <div className="space-y-3 rounded-lg border border-gray-200 bg-white/70 p-4">
                <h5 className="text-xl font-semibold text-gray-800">2.1 Information You Provide</h5>
                <p>
                  Contact and business enquiry data: full name, email address, phone number, company / organisation name, designation or role, area of interest, country/location, and any information included in your message or communication.
                </p>
                <p>
                  Careers and recruitment data: CV/resume, employment history, educational qualifications, professional skills, references, portfolio or project information, and other information submitted by you through the Careers section or in connection with recruitment.
                </p>
                <p>
                  Business-contact data received offline or through events: business cards, meeting notes, correspondence, project enquiries and professional contact details that are subsequently stored or processed in our systems.
                </p>
              </div>
              <div className="space-y-3 rounded-lg border border-gray-200 bg-white/70 p-4">
                <h5 className="text-xl font-semibold text-gray-800">2.2 Automatically Collected Information</h5>
                <p>
                  When you visit our website, we may automatically collect technical and usage information such as IP address, browser type and version, device identifiers and device information, operating system, pages visited, date and time of access, referring website information, approximate location derived from technical identifiers, cookie identifiers and similar online identifiers.
                </p>
                <p>
                  We do not intentionally collect sensitive personal data through the general website forms. You should not submit sensitive personal information unless specifically requested by JIVO for a lawful purpose through an appropriate channel.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="3. How We Use Your Information and Legal Bases">
              <p>
                We use personal information for the following purposes: to respond to enquiries and requests; provide information about our renewable energy, EPC and related business services; assess and process job applications; manage business relationships and communications; improve website functionality and user experience; analyse website performance and usage trends; maintain security, prevent unauthorised or unlawful activities, detect fraud or misuse; comply with legal, regulatory, contractual and record-keeping obligations; and protect our legal rights and interests.
              </p>
              <p>
                Where applicable, our legal bases / grounds for processing include: your consent; processing necessary to respond to your request or take steps prior to entering into a contract; performance of a contract; compliance with legal obligations; voluntary provision of personal data for a specified purpose; and our legitimate interests in responding to business enquiries, operating and securing the website, managing business relationships and improving services, provided such interests are not overridden by applicable law.
              </p>
            </PolicySection>

            <PolicySection title="4. Consent and Withdrawal">
              <p>
                Where processing is based on consent, you may withdraw your consent at any time by using the contact details stated in this Policy or by using any consent-management option made available on the website. Withdrawal of consent will not affect the lawfulness of processing carried out before withdrawal.
              </p>
              <p>
                If you withdraw consent, we may be unable to continue providing the relevant response, communication, service or functionality for which the information was collected.
              </p>
            </PolicySection>

            <PolicySection title="5. Cookies and Analytics">
              <p>
                Our website may use cookies and similar technologies to remember user preferences, improve website performance, analyse visitor behaviour, enhance user experience, secure the website and understand how visitors interact with our content.
              </p>
              <p>
                Strictly necessary cookies may be used to operate the website. Non-essential cookies, including analytics, marketing or third-party cookies, will be used only in accordance with applicable consent requirements. Where required, we will provide a cookie banner or preference tool that allows users to accept, reject or manage non-essential cookies before such cookies are placed.
              </p>
            </PolicySection>

            <PolicySection title="6. Information Sharing">
              <p>
                We do not sell or rent personal information. We may share personal information, where lawful and necessary, with: authorised employees, officers, directors, representatives and consultants; JIVO group companies, affiliates and offices in India, the United Arab Emirates, Uganda, Mauritius, Kenya, Portugal and other jurisdictions where JIVO operates; service providers supporting hosting, website operations, IT, analytics, CRM, recruitment, communications, security or other business functions; professional advisors, auditors, insurers, bankers and legal counsel; regulators, law-enforcement agencies, courts, tribunals, government authorities or other persons where disclosure is required or permitted by law; and successors or potential successors in connection with a merger, restructuring, financing, acquisition, asset transfer or similar transaction.
              </p>
              <p>
                Service providers and processors are required to process personal information under appropriate contractual obligations, including confidentiality, security and purpose-limitation obligations, where required by applicable law.
              </p>
            </PolicySection>

            <PolicySection title="7. International Data Transfers">
              <p>
                As JIVO Energy operates across multiple countries and regions, personal information may be processed, accessed, transferred or stored in jurisdictions outside your country of residence, including India, the United Arab Emirates, Uganda, Mauritius, Kenya, Portugal and other countries where JIVO, its group entities or service providers operate.
              </p>
              <p>
                Where personal information is transferred internationally, we will use safeguards required by applicable law. For India-origin digital personal data, transfers will be subject to any restrictions notified by the Central Government under applicable Indian data-protection law.
              </p>
            </PolicySection>

            <PolicySection title="8. Data Security">
              <p>
                We implement reasonable technical, organisational and security measures designed to protect personal information against unauthorised access, disclosure, alteration, loss, misuse or destruction. These measures may include access controls, authentication, encryption or obfuscation where appropriate, secure configurations, logging and monitoring, backups, vendor controls, internal policies and incident-response processes.
              </p>
              <p>
                No method of transmission over the internet or method of electronic storage is completely secure. Accordingly, while we take reasonable measures to protect personal information, we cannot guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection title="9. Data Retention">
              <p>
                We retain personal information only for as long as necessary for the purposes for which it was collected, including to respond to enquiries, manage business relationships, process recruitment applications, maintain website security, comply with legal, regulatory, accounting or reporting obligations, resolve disputes and enforce agreements.
              </p>
              <p>
                Indicatively, enquiry and business-contact data may be retained for the duration of the business relationship and for a reasonable period thereafter; recruitment data may be retained for the recruitment process and for a reasonable period after the role closes or as required by law; technical logs may be retained for security, audit and diagnostic purposes for a limited period; and records required for legal or regulatory purposes may be retained for the period required by applicable law.
              </p>
              <p>
                When personal information is no longer required, we will delete, anonymise or securely archive it, subject to legal retention requirements and legitimate dispute-resolution needs.
              </p>
            </PolicySection>

            <PolicySection title="10. Your Rights">
              <p>
                Subject to applicable law, you may have rights to access information about your personal data and processing, request correction or completion of inaccurate or incomplete information, request erasure/deletion, withdraw consent where processing is based on consent, object to or restrict certain processing, request data portability where applicable, seek grievance redressal, nominate another person to exercise rights in the event of death or incapacity where applicable, and lodge a complaint with the relevant data-protection authority or supervisory authority.
              </p>
              <p>
                For India, once the relevant provisions of the Digital Personal Data Protection Act, 2023 and rules are in force, you may exercise rights available to data principals, including access, correction, erasure, grievance redressal and nomination, through the channel stated in this Policy. For EEA visitors, you may also have the right to lodge a complaint with a competent supervisory authority, including the Portuguese supervisory authority (CNPD) where applicable.
              </p>
              <p>
                To exercise rights, please contact us using the details in the Contact Us / Grievance Redressal section. We may verify your identity before acting on a request and will respond within the time required by applicable law.
              </p>
            </PolicySection>

            <PolicySection title="11. Grievance Redressal">
              <p>
                In accordance with applicable Indian law, JIVO will designate and publish the name and contact details of a Grievance Officer to address discrepancies and grievances relating to processing of personal information. The Grievance Officer will redress grievances expeditiously and within one month from the date of receipt of the grievance, or within such other period as may be prescribed by applicable law.
              </p>
              <p>
                Grievance Officer: [insert name/designation]
              </p>
              <p>Email: [privacy@jivoenergy.com / insert dedicated privacy email]</p>
              <p>Postal Address: [insert full address]</p>
            </PolicySection>

            <PolicySection title="12. Third-Party Links">
              <p>
                Our website may contain links to third-party websites, social media platforms and external resources. We do not control and are not responsible for the content, security, terms or privacy practices of third-party websites. You should review the privacy policies of those third parties before providing any information to them.
              </p>
            </PolicySection>

            <PolicySection title="13. Children&apos;s Privacy">
              <p>
                Our website and services are intended for businesses, organisations and adults. We do not knowingly collect personal information from children under 18 years of age. If we become aware that personal information of a child has been collected without appropriate lawful basis or consent, we will take reasonable steps to delete such information, subject to applicable law.
              </p>
            </PolicySection>

            <PolicySection title="14. Changes to This Policy">
              <p>
                We may update this Privacy Policy periodically. Any updates will be posted on this page with a revised effective date / last updated date. Where changes are material, we may provide a prominent notice on the website and, where appropriate, notify affected individuals by email or other reasonable means.
              </p>
            </PolicySection>

            <PolicySection title="15. Contact Us">
              <p>For privacy-related questions, rights requests or grievances, please contact:</p>
              <p>
                JIVO Energy - JIVO ENERGY PVT LTD
                <br />
                India Office: 108-111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurugram, Haryana, India
                <br />
                Email: <a href="mailto:info@jivoenergy.com" target="_blank">info@jivoenergy.com</a>
                <br />
                Website: <a href="https://www.jivoenergy.com" target="_blank" rel="noopener noreferrer">www.jivoenergy.com</a>
              </p>
            </PolicySection>
          </div>
        </div>
      </section>




      <Footer />
    </main>
  );
}