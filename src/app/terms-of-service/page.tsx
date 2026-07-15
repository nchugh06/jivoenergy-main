"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h4 className="text-2xl md:text-3xl font-bold text-[#085D36]">{title}</h4>
      <div className="space-y-4 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsOfService() {

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



      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="section-title-spl text-center text-[#062516] mb-10">
            Terms of Service
          </h3>

          <div className="mb-8 space-y-1 text-gray-600">
            <p>Effective Date: [12 June 2026]</p>
            <p>Last Updated: [12 June 2026]</p>
          </div>

          <div className="space-y-8">
            <TermsSection title="1. Introduction And Acceptance">
              <p>
                These Terms of Service (&quot;Terms&quot;) govern access to and use of www.jivoenergy.com and any pages, content, forms or materials made available through the website (the &quot;Website&quot;) operated by [insert full legal name of JIVO website operating entity], having its registered office at [insert registered office address] (&quot;JIVO Energy&quot;, &quot;JIVO&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot;).
              </p>
              <p>
                By accessing or using the Website, submitting a contact or careers form, or otherwise interacting with the Website, you agree to these Terms. If you do not agree, you should not use the Website. Where a form is submitted on behalf of an organisation, the person submitting the form represents that he or she is authorised to provide the information and interact with JIVO on behalf of that organisation.
              </p>
              <p>
                You represent that you are at least 18 years of age and have the legal capacity and authority to use the Website and accept these Terms. JIVO should obtain affirmative acceptance through an unticked checkbox at contact-form and careers-form submission points, with these Terms and the Privacy Policy hyperlinked.
              </p>
            </TermsSection>

            <TermsSection title="2. Use of Website / Acceptable Use">
              <p>
                The content on the Website is provided for general business and informational purposes only. JIVO may modify, update, suspend or discontinue any part of the Website at any time, subject to applicable law.
              </p>
              <p>
                You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of JIVO or any third party, restrict or inhibit use of the Website by others, or interfere with the security, integrity or operation of the Website.
              </p>
              <p>
                You must not: (a) scrape, crawl, data-mine, harvest or use automated means to access the Website except as permitted by law or by JIVO in writing; (b) introduce malware, viruses, harmful code or disruptive material; (c) attempt unauthorised access to systems, accounts, servers or networks; (d) bypass security measures, rate limits or access controls; (e) use Website content to train, fine-tune or develop artificial-intelligence, machine-learning or competing commercial products without written permission; (f) impersonate any person or entity; (g) submit false, misleading, unlawful, infringing or confidential third-party information; or (h) use the Website in a manner that could damage JIVO's reputation or business interests.
              </p>
            </TermsSection>

            <TermsSection title="3. Intellectual Property">
              <p>
                All content on the Website, including text, graphics, logos, trade marks, icons, images, videos, documents, design, layout, data compilations and other materials, is owned by JIVO Energy or its licensors and is protected by applicable intellectual-property and trade-mark laws.
              </p>
              <p>
                JIVO ENERGY, the JIVO logo, product names, project names and related branding are trade marks or identifiers of JIVO or its licensors. Nothing on the Website grants any licence, assignment or right to use any intellectual property, except that you may view, download and print Website pages for internal, non-commercial reference, provided that all proprietary notices are retained and the content is not modified, reproduced, distributed or used for commercial purposes without JIVO's prior written permission.
              </p>
            </TermsSection>

            <TermsSection title="4. Accuracy of Information and Disclaimer">
              <p>
                While JIVO makes reasonable efforts to keep Website content accurate and up to date, we do not warrant or guarantee the completeness, accuracy, adequacy, reliability, availability or timeliness of any content.
              </p>
              <p>
                The Website and its content are provided on an 'as is' and 'as available' basis, without warranties of any kind, whether express, implied, statutory or otherwise, including warranties of uninterrupted availability, error-free operation, fitness for a particular purpose, non-infringement, security or absence of harmful components, to the maximum extent permitted by law.
              </p>
              <p>
                Information on the Website, including project descriptions, business metrics, pipeline figures, capabilities, country presence, case studies or forward-looking statements, is indicative business information only. It does not constitute an offer, invitation, solicitation, investment advice, technical advice, legal advice, financial advice or a representation on which any person should rely without independent verification and written confirmation from JIVO.
              </p>
            </TermsSection>

            <TermsSection title="5. Third-Party Links">
              <p>
                The Website may contain links to third-party websites, social media platforms and external resources for convenience or informational purposes. JIVO does not control, endorse or assume responsibility for the content, products, services, security, terms or privacy practices of any third-party website. Access to third-party websites is at your own risk and subject to the terms and policies of those websites.
              </p>
            </TermsSection>

            <TermsSection title="6. Privacy">
              <p>
                Your use of the Website and submission of information through the Website are also governed by JIVO's Privacy Policy, which is incorporated into these Terms by reference. In case of any inconsistency relating specifically to processing of personal information, the Privacy Policy will apply to that subject matter.
              </p>
            </TermsSection>

            <TermsSection title="7. User Submissions">
              <p>
                If you submit enquiries, messages, ideas, feedback, proposals, CVs or other information through the Website, you represent that you have the right to submit such information and that it is accurate, lawful and not misleading. Personal information submitted by you will be handled in accordance with the Privacy Policy.
              </p>
              <p>
                Unless a separate written agreement states otherwise, non-personal ideas, suggestions, feedback or business proposals submitted through the Website are not confidential and may be used by JIVO for evaluation, improvement or business purposes without obligation to you, provided that personal information will remain subject to the Privacy Policy.
              </p>
            </TermsSection>

            <TermsSection title="8. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, JIVO Energy, its group entities, directors, officers, employees, representatives, advisers and service providers shall not be liable for any direct, indirect, incidental, consequential, special, punitive or exemplary damages, loss of profits, loss of business, loss of data, business interruption or other loss arising out of or in connection with use of, inability to use, or reliance on the Website or any Website content.
              </p>
            </TermsSection>

            <TermsSection title="9. Indemnity">
              <p>
                You agree to indemnify and hold harmless JIVO Energy, its group entities, directors, officers, employees, representatives and advisers from and against claims, losses, liabilities, damages, costs and expenses, including reasonable legal fees, arising from your unlawful use of the Website, breach of these Terms, infringement of third-party rights, or submission of false, misleading, unlawful or unauthorised information.
              </p>
            </TermsSection>

            <TermsSection title="10. Suspension, Blocking and Termination">
              <p>
                JIVO may restrict, suspend, block or terminate access to the Website, in whole or in part, where it reasonably believes that a user has breached these Terms, misused the Website, attempted unauthorised access, introduced harmful code, engaged in scraping or automated access, or otherwise created legal, security or operational risk for JIVO or others.
              </p>
            </TermsSection>

            <TermsSection title="11. Changes To These Terms">
              <p>
                JIVO may revise these Terms periodically. Updated Terms will be posted on the Website with a revised effective date / last updated date. Where changes are material, JIVO may provide a prominent notice on the Website or take other reasonable steps to bring the changes to users' attention. Continued use of the Website after updated Terms are posted constitutes acceptance of the revised Terms, subject to applicable law.
              </p>
            </TermsSection>

            <TermsSection title="12. Governing Law and Jurisdiction">
              <p>
                These Terms, the Website and any dispute arising out of or in connection with them shall be governed by the laws of India, without regard to conflict-of-law principles. Subject to any mandatory applicable law, the courts at Gurugram, Haryana, India shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms or the Website.
              </p>
            </TermsSection>

            <TermsSection title="13. General Provisions">
              <p>
                If any provision of these Terms is held invalid, illegal or unenforceable, the remaining provisions will remain in full force and effect. JIVO's failure to enforce any provision will not constitute a waiver. You may not assign or transfer any rights or obligations under these Terms without JIVO's prior written consent. JIVO may assign or transfer its rights or obligations in connection with restructuring, merger, acquisition, asset transfer or by operation of law. These Terms, together with the Privacy Policy and any additional terms expressly incorporated, constitute the entire agreement relating to Website use. Provisions intended by their nature to survive, including intellectual property, disclaimers, limitation of liability, indemnity, governing law and jurisdiction, will survive termination or cessation of Website use.
              </p>
            </TermsSection>

            <TermsSection title="14. Contact Information">
              <p>
                For privacy-related questions, rights requests or grievances, please contact:
              </p>
              <p>
                JIVO Energy - JIVO ENERGY PVT LTD
                <br />
                India Office: 108-111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurugram, Haryana, India
                <br />
                Email: <a href="mailto:africa@jivoenergy.com" target="_blank">africa@jivoenergy.com</a>
                <br />
                Website: <a href="https://www.jivoenergy.com" target="_blank" rel="noopener noreferrer">www.jivoenergy.com</a>
              </p>
            </TermsSection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}