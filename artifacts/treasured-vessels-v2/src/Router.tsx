import { Switch, Route, Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import ProgramsOverview from "@/pages/ProgramsOverview";
import ProgramDetail from "@/pages/ProgramDetail";
import Donate from "@/pages/Donate";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import GenericPage from "@/components/layout/GenericPage";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

function Router() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={ProgramsOverview} />
        <Route path="/programs/:id" component={ProgramDetail} />
        <Route path="/donate" component={Donate} />
        
        {/* Real-content routes, filled in from Treasured Vessels' own materials */}
        <Route path="/about/founder">
          {() => (
            <GenericPage title="Our Founder">
              <img
                src={`${import.meta.env.BASE_URL}images/founder.jpg`}
                alt="Racheal Muggaga Achen, Founder of Treasured Vessels Girls' Centre"
                className="w-full max-w-sm rounded-[24px] shadow-lg mb-8 not-prose"
              />
              <p><strong>Racheal Muggaga Achen</strong> founded Treasured Vessels Girls' Centre in 2018 in Jinja District, Eastern Uganda.</p>
              <p>She established the Centre in response to the number of girls and women in her community left without adequate care and support &mdash; including children affected by the loss of parents to HIV/AIDS, women navigating remarriage, divorce or widowhood, families in dispute, and girls at risk of trafficking and sexual exploitation.</p>
              <p>Under her leadership, Treasured Vessels has grown from grassroots community support into a fully registered community based organisation (CBO) running six active programs and drawing on around 30 regular volunteers.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/about/governance">
          {() => (
            <GenericPage title="Governance & Transparency">
              <p>Treasured Vessels Girls' Centre is a fully registered, women-led community based organisation (CBO) operating in Jinja District, Eastern Uganda.</p>
              <p>Accountability and transparency is one of our core values. We are committed to being answerable for our decisions and to being honest, trustworthy stewards of every resource entrusted to us by donors, partners and the communities we serve.</p>
              <p>We welcome partnership and scrutiny from NGOs, government agencies, community groups and donors who share our commitment to girls' and women's empowerment. For specific questions about our governance or financial reporting, please <Link href="/contact">contact us</Link> directly.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/about/faqs">
          {() => (
            <GenericPage title="Frequently Asked Questions">
              {[
                {
                  q: "What is Treasured Vessels Girls' Centre?",
                  a: "Treasured Vessels Girls' Centre is a women-led, non-governmental community based organisation founded in 2018, dedicated to empowering girls and young women in Eastern Uganda."
                },
                {
                  q: "What are your main programs?",
                  a: "We run five core areas of work: education support (scholarships, school re-entry and mentorship), economic empowerment (vocational skills and entrepreneurship training), girls' rights advocacy, health and reproductive rights (including menstrual hygiene), and social support and rehabilitation (counselling, shelter and support for vulnerable girls)."
                },
                {
                  q: "Who benefits from your programs?",
                  a: "Vulnerable girls and young women facing poverty, abuse or school dropout; teenage mothers; survivors of gender-based violence and early marriage; and young women seeking economic empowerment."
                },
                {
                  q: "How do you support girls who have dropped out of school?",
                  a: "We provide alternative education and vocational training, counselling, and reintegration support to help girls return to school or build an independent livelihood."
                },
                {
                  q: "How do you support teenage mothers?",
                  a: "We offer counselling, life skills and parenting education, alongside economic empowerment opportunities so young mothers can provide for themselves and their children."
                },
                {
                  q: "What role can parents and the community play?",
                  a: "Parents and community members help by raising awareness, working to prevent early marriage and gender-based violence, and providing mentorship to girls at risk."
                },
                {
                  q: "How can I support or donate?",
                  a: "You can donate funds or resources such as school materials, sanitary pads and vocational tools, sponsor a girl's education, or volunteer your time and skills."
                },
                {
                  q: "Do you provide shelter?",
                  a: "Yes. We provide temporary shelter and emergency support to girls facing abuse, abandonment, or unsupported pregnancy."
                },
                {
                  q: "How does a girl join your programs?",
                  a: "Girls can reach out to us directly, be referred by community leaders, or apply through our local office."
                },
                {
                  q: "Do you partner with other organisations?",
                  a: "Yes. We partner with NGOs, government agencies, community groups and donors who support us with funding, resources and advocacy."
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </GenericPage>
          )}
        </Route>
        <Route path="/impact">
          {() => (
            <GenericPage title="Our Impact">
              <p>Since our founding in 2018, we've focused our energy on practical, community-led causes:</p>
              <ul>
                <li><strong>Girls Empowerment Projects</strong> &mdash; soap making, tailoring, crafts, hairdressing and shoe making.</li>
                <li><strong>Pregnancy Centre</strong> &mdash; antenatal support and guidance through the delivery process.</li>
                <li><strong>Sponsorship</strong> &mdash; supporting girls and their children's education.</li>
                <li><strong>School Outreach</strong> &mdash; menstrual hygiene teaching and sanitary kit distribution.</li>
                <li><strong>Women Assessments</strong> &mdash; understanding the needs of women in our community.</li>
                <li><strong>Helping the Elderly</strong> &mdash; community outreach, including flood relief support in Mbale.</li>
              </ul>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose my-10">
                {[
                  { number: "13", label: "Successful Donations" },
                  { number: "30", label: "Regular Volunteers" },
                  { number: "6", label: "Active Programs" },
                  { number: "8", label: "Years in Mission" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-brand-cream">
                    <div className="font-serif text-3xl text-brand-purple mb-1">{stat.number}</div>
                    <div className="text-xs font-medium text-brand-charcoal/70">{stat.label}</div>
                  </div>
                ))}
              </div>
              <img
                src={`${import.meta.env.BASE_URL}images/womens-day.jpg`}
                alt="Women and children at a Treasured Vessels community celebration"
                className="w-full rounded-[24px] shadow-lg not-prose"
              />
            </GenericPage>
          )}
        </Route>
        <Route path="/stories">
          {() => (
            <GenericPage title="Stories of Change">
              <p>Alongside the personal journeys of the girls and women we support, here are a couple of recent moments from our work in the community.</p>
              <h3>Water in the Community</h3>
              <img
                src={`${import.meta.env.BASE_URL}images/water-access.jpg`}
                alt="Treasured Vessels team supporting a community with water access"
                className="w-full rounded-[24px] shadow-lg not-prose mb-4"
              />
              <p>Our team continues to work alongside underserved communities facing water access challenges, part of our broader commitment to the wellbeing of the families around us.</p>
              <h3>Celebrating Women's Day</h3>
              <img
                src={`${import.meta.env.BASE_URL}images/womens-day.jpg`}
                alt="Women and children celebrating together at a Treasured Vessels event"
                className="w-full rounded-[24px] shadow-lg not-prose mb-4"
              />
              <p>We marked Women's Day together with mothers, babies and girls from across our community &mdash; a celebration of resilience and togetherness.</p>
              <p className="text-sm text-muted-foreground">Individual testimonial stories will be added here as they are documented.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/news">
          {() => (
            <GenericPage title="News & Updates">
              <p>We're working on bringing you regular updates from the Centre. In the meantime, visit our <Link href="/stories">Stories of Change</Link> page for recent highlights, or follow us on social media for the latest from Jinja District.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/contact">
          {() => (
            <GenericPage title="Contact Us">
              <p>We'd love to hear from you &mdash; whether you want to volunteer, partner with us, or simply learn more about our work.</p>
              <ul>
                <li><strong>Address:</strong> Walukuba-Masese Rd, Jinja District, Eastern Uganda</li>
                <li><strong>Phone:</strong> +256 756 233 041 / +256 774 427 101</li>
                <li><strong>Email:</strong> treassuredvesselsug@gmail.com</li>
              </ul>
              <a
                href="https://maps.app.goo.gl/Z1XvjQeUSutmSnAP8"
                target="_blank"
                rel="noopener noreferrer"
                className="not-prose block group no-underline"
                aria-label="Open the Treasured Vessels Girls' Centre location in Google Maps (opens in a new tab)"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/map.png`}
                  alt="Map showing the location of Treasured Vessels Girls' Centre"
                  className="w-full rounded-[24px] shadow-lg border border-border transition-shadow group-hover:shadow-xl"
                />
                <span className="mt-3 block text-sm font-medium text-brand-pink">
                  Open in Google Maps &#8599;
                </span>
              </a>
            </GenericPage>
          )}
        </Route>
        <Route path="/get-involved/sponsor">
          {() => (
            <GenericPage title="Sponsor a Girl">
              <p>Direct sponsorship provides ongoing educational support for a vulnerable girl or, in some cases, for a young mother and her child &mdash; covering tuition, scholastic materials, and mentorship so she can stay in school.</p>
              <p>To discuss sponsoring a girl, please <Link href="/contact">get in touch with us</Link> or make a general contribution through our <Link href="/donate">donation page</Link>.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/get-involved/partner">
          {() => (
            <GenericPage title="Partner With Us">
              <p>We partner with NGOs, government agencies, community groups and donors who share our commitment to girls' and women's empowerment. Partners support us with funding, resources and advocacy across our six program areas.</p>
              <p>If your organisation would like to explore a partnership, please reach out via our <Link href="/contact">contact page</Link>.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/get-involved/volunteer">
          {() => (
            <GenericPage title="Volunteer">
              <p>We currently have volunteer opportunities across Jinja City and are always glad of extra hands &mdash; whether for vocational training support, school outreach, or community events.</p>
              <p>To register your interest, please <Link href="/contact">contact us</Link> with your skills and availability.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/policies/privacy">
          {() => (
            <GenericPage title="Privacy Policy">
              <p className="text-sm text-muted-foreground"><strong>Effective Date:</strong> 15 July 2026</p>
              <p>Treasured Vessels Girls' Centre ("we", "our", or "us") is committed to protecting the privacy of our website visitors, supporters, donors, volunteers, sponsors, and partners. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
              <p>By using our website, you agree to the terms outlined in this Privacy Policy.</p>

              <h2>1. Who We Are</h2>
              <p>Treasured Vessels Girls' Centre is a registered, women-led community based organisation (CBO) dedicated to providing care, support, education, and opportunities for vulnerable girls, teenage mothers, and women in Jinja District, Eastern Uganda. Through donations, sponsorships, partnerships, and community initiatives, we seek to improve the lives of those entrusted to our care.</p>
              <p>If you have any questions regarding this Privacy Policy, please contact us:</p>
              <ul>
                <li><strong>Organisation:</strong> Treasured Vessels Girls' Centre</li>
                <li><strong>Address:</strong> Walukuba-Masese Rd, Jinja District, Eastern Uganda</li>
                <li><strong>Phone:</strong> +256 756 233 041 / +256 774 427 101</li>
                <li><strong>Email:</strong> treassuredvesselsug@gmail.com</li>
              </ul>

              <h2>2. Information We Collect</h2>
              <p>We may collect the following information when you interact with our website:</p>
              <p><strong>Personal Information</strong></p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Donation details</li>
                <li>Sponsorship information</li>
                <li>Volunteer applications</li>
                <li>Information submitted through contact forms</li>
              </ul>
              <p><strong>Non-Personal Information</strong></p>
              <ul>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited</li>
                <li>Time and date of visits</li>
                <li>Referring websites</li>
                <li>General website usage data</li>
              </ul>

              <h2>3. How We Collect Information</h2>
              <p>Information may be collected when you:</p>
              <ul>
                <li>Submit a contact form.</li>
                <li>Make a donation.</li>
                <li>Subscribe to newsletters or updates.</li>
                <li>Sponsor a girl or program.</li>
                <li>Register to volunteer.</li>
                <li>Communicate with us by email or phone.</li>
                <li>Browse our website.</li>
              </ul>
              <p>We may also collect information through cookies and analytics tools.</p>

              <h2>4. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Respond to enquiries and requests.</li>
                <li>Process donations and sponsorships.</li>
                <li>Provide updates about our programs and activities.</li>
                <li>Improve our website and user experience.</li>
                <li>Manage volunteer and partnership applications.</li>
                <li>Send newsletters and promotional communications (where consent has been provided).</li>
                <li>Meet legal and regulatory obligations.</li>
              </ul>
              <p>We will only use your information for purposes directly related to the operation of Treasured Vessels Girls' Centre and will not sell your personal information to third parties.</p>

              <h2>5. Donations and Payment Information</h2>
              <p>If you make a donation through our website, payments are processed securely through third-party payment providers.</p>
              <p>Treasured Vessels Girls' Centre does not store your complete credit card, mobile money, or banking details on our servers. We recommend reviewing the privacy policies of any payment providers used on our website.</p>

              <h2>6. Cookies</h2>
              <p>Our website may use cookies to improve functionality and enhance your browsing experience.</p>
              <p>Cookies may be used to:</p>
              <ul>
                <li>Remember your preferences.</li>
                <li>Analyse website traffic.</li>
                <li>Improve website performance.</li>
                <li>Provide relevant content.</li>
              </ul>
              <p>You may choose to disable cookies through your browser settings; however, some parts of the website may not function correctly.</p>

              <h2>7. Third-Party Services</h2>
              <p>Our website may contain links to third-party websites or use third-party services, including:</p>
              <ul>
                <li>Payment gateways</li>
                <li>Email marketing platforms</li>
                <li>Social media platforms</li>
                <li>Website analytics providers</li>
                <li>Embedded videos and content</li>
              </ul>
              <p>We are not responsible for the privacy practices of third-party websites and encourage users to review their privacy policies.</p>

              <h2>8. Protection of Children's and Girls' Privacy</h2>
              <p>Treasured Vessels Girls' Centre is committed to protecting the privacy and dignity of the girls, teenage mothers, and women we serve.</p>
              <p>Photographs, stories, and other content featuring the girls and women in our care are used responsibly and, where appropriate, with consent from the individual or an authorised guardian. Sensitive information that could compromise someone's safety or identity will not be published.</p>
              <p>We do not knowingly collect personal information directly from minors through our website without appropriate consent.</p>

              <h2>9. Disclosure of Information</h2>
              <p>We may disclose your information when required to:</p>
              <ul>
                <li>Comply with legal obligations.</li>
                <li>Protect the rights, property, or safety of Treasured Vessels Girls' Centre, our supporters, or others.</li>
                <li>Assist law enforcement authorities where legally required.</li>
                <li>Facilitate services provided by trusted third-party providers acting on our behalf.</li>
              </ul>
              <p>All third-party providers are expected to maintain appropriate confidentiality and security standards.</p>

              <h2>10. Data Security</h2>
              <p>We take reasonable measures to protect your personal information from unauthorised access, alteration, disclosure, misuse, loss, or destruction.</p>
              <p>While we strive to protect your information, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

              <h2>11. International Visitors</h2>
              <p>As Treasured Vessels Girls' Centre welcomes supporters internationally, your information may be stored or processed in countries outside your place of residence, including Uganda and other jurisdictions where our service providers operate.</p>
              <p>By using our website, you consent to the transfer of your information where necessary to provide our services.</p>

              <h2>12. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections to inaccurate information.</li>
                <li>Request deletion of your personal information.</li>
                <li>Withdraw consent to marketing communications.</li>
                <li>Lodge a complaint regarding the handling of your information.</li>
              </ul>
              <p>To exercise any of these rights, please contact us using the details provided above.</p>

              <h2>13. Retention of Information</h2>
              <p>We retain personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy or as required by law.</p>

              <h2>14. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
              <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>

              <h2>15. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or how your information is handled, please contact:</p>
              <p>
                <strong>Treasured Vessels Girls' Centre</strong><br />
                Walukuba-Masese Rd, Jinja District, Eastern Uganda<br />
                treassuredvesselsug@gmail.com<br />
                +256 756 233 041 / +256 774 427 101
              </p>

              <h3>Commitment to Privacy</h3>
              <p>At Treasured Vessels Girls' Centre, we believe every girl and woman deserves dignity, protection, and hope. We are committed to handling your personal information with the same care, integrity, and respect that guides our work with vulnerable girls and communities every day.</p>
            </GenericPage>
          )}
        </Route>
        <Route path="/policies/:id">
          {() => (
            <GenericPage title="Policy Document">
              <p>Placeholder content for official policies (Safeguarding, Donation). Let us know what should go here.</p>
            </GenericPage>
          )}
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

export default Router;
