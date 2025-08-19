import React from "react";
import Image from 'next/image'
import { ArrowRightCircle} from 'lucide-react'

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
];

const ecosystemData = [
  {
    id: "01",
    title: "Government / Policymaker",
    image: "/image_2.png",
    position: { top: "421px", left: "935px" },
  },
  {
    id: "02",
    title: "Corporate / Businesses",
    image: "/image_3.png",
    position: { top: "551px", left: "1282px" },
  },
  {
    id: "03",
    title: "Carbon Developer",
    image: "/image_4.png",
    position: { top: "421px", left: "1629px" },
  },
  {
    id: "04",
    title: "Technology Partner",
    image: "/image_5.png",
    position: { top: "485px", left: "1976px" },
  },
];

const realTimeFeatures = [
  {
    title: "MONITOR PROJECT LAUNCHES",
    description:
      "Track where and when new carbon projects are coming online. By region, type, and developer.",
    position: { top: "391px", left: "151px" },
    circlePosition: { top: "536px", left: "263px" },
    // lineImage: "/Line 11.png",
    // linePosition: { top: "562px", left: "289px" },
  },
  {
    title: "FOLLOW MARKET SIGNALS",
    description:
      "Stay updated on credit issuance, retirements, and pricing trends across registries.",
    position: { top: "466px", left: "1189px" },
    circlePosition: { top: "613px", left: "1210px" },
    // lineImage: "/Line 13.png",
    // linePosition: { top: "639px", left: "1161px" },
  },
  {
    title: "WATCH POLICY SHIFTS",
    description:
      "Track climate policy updates, jurisdictional programs, and international agreements as they evolve.",
    position: { top: "1307px", left: "64px" },
    circlePosition: { top: "1222px", left: "379px" },
    // lineImage: "/Line 10.png",
    // linePosition: { top: "1051px", left: "405px" },
  },
  {
    title: "MAP TECH DEPLOYMENT",
    description:
      "Visualize where MRV tools, carbon removal tech, and digital infrastructure are being scaled.",
    position: { top: "1221px", left: "1185px" },
    circlePosition: { top: "1140px", left: "1297px" },
    // lineImage: "/Line 12.png",
    // linePosition: { top: "1008px", left: "1102px" },
  },
];

const projectFeatures = [
  {
    title: "Filter Projects",
    description:
      "Explore a complete archive by methodology, geography, project types. From biochar deployments to soil carbon initiatives. Compare strategies across contexts and conditions.",
    iconPosition: { top: "2499px", left: "240px" },
  },
  {
    title: "See What Works",
    description:
      "Get inside real-world implementations and tradeoffs. Understand how developers, communities, and financiers are balancing impact, integrity, and scale.",
    iconPosition: { top: "2499px", left: "663px" },
  },
  {
    title: "Track What's Next",
    description:
      "Follow the signals shaping the next generation of carbon projects. From frontier tech to new governance models, see where innovation is leading and where the market is moving.",
    iconPosition: { top: "2499px", left: "1129px" },
  },
];

const articlesData = [
  {
    category: "ARTICLES",
    mainTitle:
      "How human-centred cities address multidimensional poverty and build urban resilience in Latin America",
    articles: [
      "Why investment in sustainable infrastructure is key to financial resilience in a changing climate",
      "Rewilding our cities: How urban nature restoration is reshaping the future of urban life – and business",
      "Nature Positive: Corporate Assessment Guide for Financial Institutions",
      "How the birthplace of Earth Day became a climate innovation hub",
    ],
  },
  {
    category: "POLICIES",
    mainTitle:
      "WTO sounds alarm on trade risks as 2025 outlook weakens, and other international trade stories to know this month",
    articles: [
      "Implementation options for ASEAN's Digital Economy Framework Agreement",
      "The world needs a new food revolution. Here's how to empower farmers to make it happen",
      "This is the state of play in the global data centre gold rush",
      "The game of 'chicken' being played with the world economy can be brought to a cooperative end",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="bg-[#0b3954] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#0b3954] overflow-hidden border border-solid border-black w-[1512px] h-[6064px] relative">
        {/* Header Navigation */}
        <header className="absolute top-[43px] left-0 w-full z-10">
          <Image
            className="absolute w-[153px] h-[50px] top-[2px] left-[74px]"
            alt="Group"
            src="/Group 6.png"
            width={153}
            height={50}
          />

          <nav className="grid grid-cols-3 grid-rows-1 w-[350px] h-[27px] gap-[70px] absolute top-[16px] left-[587px]">
            {navigationItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative ${index === 0 ? "row-[1_/_2] col-[1_/_2]" : index === 1 ? "row-[1_/_2] col-[2_/_3] justify-self-center self-center" : "row-[1_/_2] col-[3_/_4]"} w-auto h-[27px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-lg tracking-[0] leading-[normal] hover:text-[#56bdba] transition-colors`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-1 grid-rows-1 w-[159px] h-[59px] gap-2.5 px-5 py-4 absolute top-0 left-[1290px] bg-[#56bdba] rounded-[25px] hover:bg-[#4aa8a5] transition-colors cursor-pointer">
            <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center w-[101px] h-[27px] [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-lg text-center tracking-[0] leading-[normal]">
              Contact Us
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="absolute w-[475px] h-[300px] top-[249px] left-[73px]">
          <h1 className="absolute w-[474px] top-0 left-px [font-family:'Poppins-Light',Helvetica] font-light text-[#56bdba] text-[45px] tracking-[0] leading-[60px]">
            The climate system is now searchable. <br />
            <br />
            <br />
            Start exploring.
          </h1>

          <Image
            className="absolute w-0.5 h-[42px] top-[161px] left-0"
            alt="Line"
            src="/Line 8.png"
            width={0.5}
            height={42}
          />
        </section>

        <div className="absolute w-[474px] top-[249px] left-[795px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0b3954] text-[32px] text-center tracking-[0] leading-[normal]">
          Ask me anything.
        </div>

        <button className="absolute w-[171px] h-[49px] top-[574px] left-[74px] group">
          <div className="relative w-[169px] h-[49px] rounded-[24.55px] border border-solid border-[#d9d9d9] group-hover:border-[#56bdba] transition-colors">
            <div className="absolute w-32 h-10 top-0.5 left-[19px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[15px] text-center tracking-[0] leading-[normal]">
              Discover More
            </div>
          </div>
        </button>

        {/* Real-time Activity Section */}
        <section className="absolute w-[1833px] h-[1833px] top-[627px] left-[-66px] rounded-[916.5px]">
          <div className="absolute w-[1833px] h-[1833px] top-0 left-0 rounded-[916.5px] border border-solid border-[#ffffff33] rotate-[-90.00deg]">
            <div className="relative w-[1514px] h-[1514px] top-[102px] left-[217px] rounded-[757.22px] border border-solid border-[#ffffff33]">
              <div className="absolute w-[1205px] h-[1205px] top-[123px] left-48 rounded-[602.5px] border border-solid border-[#ffffff33]" />
              <div className="absolute w-[880px] h-[882px] top-[276px] left-[393px] rounded-[440px/441px] border border-solid border-[#ffffff33]" />
            </div>
          </div>

          <div className="absolute w-[30px] h-[30px] top-[61px] left-[1426px]">
            <div className="relative w-8 h-8 -top-px -left-px bg-[url(/vector.png)] bg-[100%_100%]">
            </div>
          </div>

          <Image
            className="absolute w-[842px] h-[843px] top-[359px] left-[401px]"
            alt="Isolation mode"
            src="/Isolation_Mode.png"
            width={842}
            height={843}
          />

          {realTimeFeatures.map((feature, index) => (
            <div key={index}>
              {/* <Image
                className={`absolute w-auto h-auto`}
                style={{
                  top: feature.linePosition.top,
                  left: feature.linePosition.left,
                }}
                alt="Line"
                src={feature.lineImage}
              /> */}

              <p
                className="absolute w-[276px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] text-center tracking-[0] leading-[normal]"
                style={{
                  top: feature.position.top,
                  left: feature.position.left,
                  width: index === 2 ? "308px" : "276px",
                }}
              >
                {feature.title}
                <br />
                <br />
                {feature.description}
              </p>

              <div
                className="absolute w-[51px] h-[51px] bg-[#d9d9d9] rounded-[25.5px]"
                style={{
                  top: feature.circlePosition.top,
                  left: feature.circlePosition.left,
                }}
              />
            </div>
          ))}

          <h2 className="absolute w-[849px] top-[238px] left-[140px] [font-family:'Poppins-Light',Helvetica] font-light text-[#56bdba] text-[45px] tracking-[0] leading-[60px]">
            Discover global activity in real time
          </h2>

          <h2 className="absolute w-[977px] top-[1639px] left-[140px] [font-family:'Poppins-Light',Helvetica] font-light text-[#56bdba] text-[45px] tracking-[0] leading-[60px]">
            Browse a global archive of <br />
            boundary-pushing projects.
          </h2>

          <ArrowRightCircle className="!absolute !w-[70px] !h-[70px] !top-[1640px] !left-[786px] cursor-pointer hover:scale-110 transition-transform" />
        </section>

        {/* Project Features Section */}
        <section className="absolute top-[2499px] left-0 w-full">
          {projectFeatures.map((feature, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? "left-[103px]" : index === 1 ? "left-[595px]" : "left-[1039px]"}`}
            >
              <div
                className={`absolute w-[109px] h-[109px] top-0 ${index === 0 ? "left-[137px]" : index === 1 ? "left-[68px]" : "left-[90px]"} rounded-[54.5px] border border-solid border-white`}
              >
                {index === 0 && (
                  <div className="relative w-[81px] h-[109px] left-3.5">
                    <div className="absolute w-[61px] h-[61px] top-0 left-2.5 rounded-[30.5px] border border-solid border-white" />
                    <div className="absolute w-[61px] h-[61px] top-12 left-2.5 rounded-[30.5px] border border-solid border-white" />
                    <div className="absolute w-[81px] h-[81px] top-7 left-0 rounded-[40.5px] border border-solid border-white" />
                    <div className="absolute w-[81px] h-[81px] top-0 left-0 rounded-[40.5px] border border-solid border-white" />
                  </div>
                )}
                {index === 1 && (
                  <>
                    <div className="absolute w-[109px] h-[109px] top-0 left-[77px] rounded-[54.5px] border border-solid border-white" />
                    <div className="absolute w-[109px] h-[109px] top-0 left-[38px] rounded-[54.5px] border border-solid border-white" />
                  </>
                )}
                {index === 2 && (
                  <>
                    <div className="absolute w-[57px] h-[57px] top-0 left-[-19px] rounded-[28.5px] border border-solid border-white" />
                    <div className="absolute w-[33px] h-[33px] top-[61px] left-[86px] rounded-[16.5px] border border-solid border-white" />
                  </>
                )}
              </div>

              <h3
                className={`absolute w-[387px] top-[151px] left-0 [font-family:'Poppins-${index === 2 ? "SemiBold" : "Medium"}',Helvetica] ${index === 2 ? "font-semibold" : "font-medium"} text-white text-[35px] text-center tracking-[0] leading-[normal]`}
              >
                {feature.title}
              </h3>

              <p className="absolute w-[317px] top-[236px] left-[35px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] text-center tracking-[0] leading-[normal]">
                {feature.description}
              </p>

              <button className="absolute w-[171px] h-[49px] top-[416px] left-[107px] group">
                <div className="relative w-[169px] h-[49px] rounded-[10px] border border-solid border-[#d9d9d9] group-hover:border-[#56bdba] transition-colors">
                  <div className="absolute w-32 h-10 top-0.5 left-[19px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[15px] text-center tracking-[0] leading-[normal]">
                    View More
                  </div>
                </div>
              </button>
            </div>
          ))}
        </section>

        <h2 className="absolute w-[926px] top-[3292px] left-[74px] [font-family:'Poppins-Light',Helvetica] font-light text-[#56bdba] text-[45px] tracking-[0] leading-[normal]">
          Track the signals driving carbon markets, policy, and project design.
        </h2>

        <ArrowRightCircle className="!absolute !w-[70px] !h-[70px] !top-[3293px] !left-[1009px] cursor-pointer hover:scale-110 transition-transform" />

        {/* Articles Section */}
        <section className="absolute top-[3522px] left-[74px] w-full">
          {articlesData.map((section, sectionIndex) => (
            <article
              key={sectionIndex}
              className={`absolute w-[666px] h-[499px] top-0 ${sectionIndex === 0 ? "left-0" : "left-[699px]"} rounded-[30px] ${sectionIndex === 0 ? "bg-[url(/rectangle.png)]" : "bg-[url(/image.png)]"} bg-[100%_100%]`}
            >
              <div className="absolute w-[169px] top-[43px] left-[37px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]">
                {section.category}
              </div>

              <h3 className="absolute w-[591px] top-[76px] left-[37px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-[25px] tracking-[0] leading-[normal]">
                {section.mainTitle}
              </h3>

              {section.articles.map((article, articleIndex) => {
                const isLeftColumn = articleIndex % 2 === 0;
                const rowIndex = Math.floor(articleIndex / 2);
                const topPosition = 203 + rowIndex * 137;
                const leftPosition = isLeftColumn
                  ? 37
                  : sectionIndex === 0
                    ? 344
                    : 339;

                return (
                  <div key={articleIndex}>
                    <div
                      className="absolute w-[169px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[11px] tracking-[0] leading-[normal]"
                      style={{
                        top: `${topPosition}px`,
                        left: `${leftPosition}px`,
                      }}
                    >
                      Articles
                    </div>

                    <p
                      className="absolute w-[284px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal]"
                      style={{
                        top: `${topPosition + 33}px`,
                        left: `${leftPosition}px`,
                      }}
                    >
                      {article}
                    </p>
                  </div>
                );
              })}
            </article>
          ))}
        </section>

        {/* Ecosystem Section */}
        <section className="absolute w-[2697px] h-[2697px] top-[4151px] left-[-860px]">
          <div className="absolute w-[2697px] h-[2697px] top-0 left-0">
            <h2 className="absolute w-[812px] top-[188px] left-[934px] [font-family:'Poppins-Light',Helvetica] font-light text-[#56bdba] text-[45px] tracking-[0] leading-[60px]">
              Work with the ecosystem <br />
              shaping carbon&apos;s next chapter.
            </h2>

            <p className="absolute w-[434px] top-[201px] left-[1860px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
              Policy, tech, finance, impact — whatever your lever, this is where
              it moves the system. From frontier methodologies to market-scale
              deployment, this ecosystem turns intent into infrastructure.
            </p>

            <p className="absolute w-[452px] top-[1564px] left-[934px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
              The carbon economy is a new operating system for climate action —
              where capital, code, and carbon intersect.
              <br />
              <br /> It&apos;s not just about removal or reduction. It&apos;s about
              redefining value, accountability, and scale.
            </p>

            <div className="absolute w-[1907px] h-[1907px] top-[395px] left-[395px] rounded-[953.64px] border border-solid border-[#ffffff33] rotate-[134.70deg]">
              <div className="relative w-[1615px] h-[1615px] top-[109px] left-[184px] rounded-[807.28px] border border-solid border-[#ffffff33]">
                <div className="relative w-[1241px] h-[1241px] top-36 left-[249px] rounded-[620.42px] border border-solid border-[#ffffff33]" />
              </div>
            </div>

            {ecosystemData.map((item, index) => (
              <div key={item.id}>
                <Image
                  className="absolute w-[326px] h-[436px]"
                  style={{ top: item.position.top, left: item.position.left }}
                  alt="Image"
                  src={item.image}
                    width={326}
                    height={436}
                />

                <div
                  className="absolute w-[326px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]"
                  style={{
                    top: `${Number.parseInt(item.position.top) + 450}px`,
                    left: item.position.left,
                  }}
                >
                  {item.id}
                </div>

                <div
                  className="absolute w-[326px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] text-right tracking-[0] leading-[normal]"
                  style={{
                    top: `${Number.parseInt(item.position.top) + 450}px`,
                    left: item.position.left,
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}

            {/* Footer */}
            <footer className="absolute top-[1780px] left-[935px]">
              <Image
                className="absolute w-[153px] h-[50px] top-[-300px] left-[-1px]"
                alt="Group"
                src="/Group 9.png"
                width={153}
                height={50}
              />

              <Image
                className="absolute w-[152px] h-5 top-0 left-0"
                alt="Social media"
                src="/Social media.png"
                width={153}
                height={5}
              />

              <Image
                className="absolute w-[1364px] h-px top-[52px] left-0 object-cover"
                alt="Line"
                src="/Line 7.png"
                width={1364}
                height={1}
              />

              <nav className="absolute top-[80px] left-0 flex gap-[151px]">
                <a
                  href="#privacy"
                  className="[font-family:'Poppins-Regular',Helvetica] font-normal text-neutral-10 text-[15px] tracking-[0] leading-5 hover:text-[#56bdba] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="[font-family:'Poppins-Regular',Helvetica] font-normal text-neutral-10 text-[15px] tracking-[0] leading-5 hover:text-[#56bdba] transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#support"
                  className="[font-family:'Poppins-Regular',Helvetica] font-normal text-neutral-10 text-[15px] tracking-[0] leading-5 hover:text-[#56bdba] transition-colors"
                >
                  Support
                </a>
              </nav>

              <p className="absolute w-[510px] top-[80px] left-[854px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-[15px] text-right tracking-[0] leading-[normal] whitespace-nowrap">
                © 2025 The Carbon Economy. All Rights Reserved.
              </p>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
};
