import type { Locale, Page } from '../lib/routes';

type Product = {
  name: string;
  category: string;
  headline: string;
  summary: string;
  audience: string;
  features: { title: string; text: string }[];
  steps: string[];
  cta: string;
};
type Copy = {
  nav: Record<Page, string>;
  meta: Record<Page, { title: string; description: string }>;
  skip: string;
  menu: string;
  language: string;
  contact: string;
  explore: string;
  home: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    productTitle: string;
    productIntro: string;
    servicesTitle: string;
    servicesIntro: string;
    services: { title: string; text: string }[];
    teamTitle: string;
    teamText: string;
  };
  product: {
    label: string;
    capabilities: string;
    workflow: string;
    sample: string;
    audience: string;
    back: string;
  };
  products: { title: string; intro: string };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    people: {
      name: string;
      portrait: string;
      linkedin: string;
      bio: string;
    }[];
  };
  contactPage: {
    title: string;
    intro: string;
    email: string;
    phone: string;
    details: string;
    address: string;
    registration: string;
    prompt: string;
  };
  closing: { title: string; text: string };
  footer: { text: string; company: string; privacy: string; settings: string };
  consent: {
    title: string;
    text: string;
    accept: string;
    reject: string;
    close: string;
    saved: string;
  };
  datahub: Product;
  tickets: Product;
};

export const copy = {
  cs: {
    nav: {
      home: 'Úvod',
      products: 'Produkty',
      datahub: 'DataHub',
      tickets: 'Dáme lístky',
      about: 'O nás',
      contact: 'Kontakt',
      legal: 'Právní informace',
      privacy: 'Ochrana osobních údajů',
      cookies: 'Cookies',
    },
    meta: {
      home: {
        title: 'Software, který propojuje',
        description:
          'Jsme NOVOSense. Vyvíjíme DataHub pro práci s daty z infrastruktury, Dáme lístky pro pořadatele a software na míru.',
      },
      products: {
        title: 'Naše produkty',
        description:
          'Dva produkty, jeden přístup. DataHub propojuje zařízení a provozní data. Dáme lístky propojuje pořadatele a jejich publikum.',
      },
      datahub: {
        title: 'DataHub — přehled nad vaší infrastrukturou',
        description:
          'Zařízení, telemetrie, mapy a upozornění v jednom kontextu. Poznejte DataHub, platformu pro provozní data a IoT.',
      },
      tickets: {
        title: 'Dáme lístky — od první vstupenky po posledního návštěvníka',
        description:
          'Vaše akce, blíž svému publiku. Dáme lístky spojuje prezentaci akce, prodej vstupenek a přivítání návštěvníků v jeden celek.',
      },
      about: {
        title: 'O nás',
        description:
          'Vojtěch Giesl a Noe Švanda. Poznejte lidi za NOVOSense a jejich zkušenosti s vývojem softwaru, infrastrukturou a mezinárodními projekty.',
      },
      contact: {
        title: 'Kontakt',
        description:
          'Zajímá vás DataHub, Dáme lístky nebo vývoj na míru? Spojte se přímo s NOVOSense.',
      },
      legal: {
        title: 'Právní informace',
        description:
          'Identifikační údaje provozovatele webu NOVOSense a informace o obsahu webu.',
      },
      privacy: {
        title: 'Ochrana osobních údajů',
        description:
          'Jak NOVOSense nakládá s údaji návštěvníků webu a lidí, kteří nás kontaktují.',
      },
      cookies: {
        title: 'Cookies a nastavení souhlasu',
        description:
          'Informace o úložišti prohlížeče, volitelné analytice a vašich možnostech.',
      },
    },
    skip: 'Přejít na obsah',
    menu: 'Menu',
    language: 'Změnit jazyk',
    contact: 'Pojďme se spojit',
    explore: 'Prohlédnout produkt',
    home: {
      eyebrow: 'NOVOSense / software s jasným účelem',
      title: 'Dobré nápady.',
      accent: 'Fungující software.',
      intro:
        'Propojujeme data, lidi a každodenní provoz. Stavíme vlastní produkty a pomáháme firmám proměnit jejich potřeby v užitečný software.',
      productTitle: 'Dva světy. Stejná péče o detail.',
      productIntro:
        'Od dat ze senzorů až po plný sál. Vlastní produkty stavíme kolem konkrétních potřeb lidí, kteří s nimi pracují.',
      servicesTitle: 'Váš projekt může být další.',
      servicesIntro:
        'Vedle vlastních produktů vyvíjíme software na míru. Zapojíme se tam, kde hotové řešení nestačí nebo spolu systémy ještě nemluví.',
      services: [
        {
          title: 'Vývoj na míru',
          text: 'Webové aplikace a interní nástroje navržené podle toho, jak váš tým skutečně pracuje.',
        },
        {
          title: 'Propojení systémů',
          text: 'API, datové toky a integrace, které dostanou informace tam, kde je potřebujete.',
        },
        {
          title: 'Od návrhu do provozu',
          text: 'Společně upřesníme zadání, ověříme řešení a připravíme aplikaci pro její každodenní používání.',
        },
      ],
      teamTitle: 'Za softwarem jsou lidé. U nás dva.',
      teamText:
        'Jsme malý tým s přímou odpovědností za to, co vytváříme. Mluvíte s lidmi, kteří váš projekt promýšlejí i staví.',
    },
    product: {
      label: 'Produkt od NOVOSense',
      capabilities: 'Co s produktem zvládnete',
      workflow: 'Od prvního kroku k výsledku',
      sample: 'Ilustrační ukázka · vzorová data',
      audience: 'Pro koho',
      back: 'Všechny produkty',
    },
    products: {
      title: 'Software pro skutečný provoz.',
      intro:
        'Dvě různé oblasti. Společný důraz na přehled, návaznost jednotlivých kroků a praktické použití.',
    },
    about: {
      eyebrow: 'O nás',
      title: 'Lidé za NOVOSense.',
      intro:
        'Jsme Vojtěch a Noe. Spojujeme zkušenosti z vývoje softwaru, správy infrastruktury a mezinárodních projektů.',
      people: [
        {
          name: 'Vojtěch Giesl',
          portrait: '/team/vojtech-giesl.jpg',
          linkedin: 'https://www.linkedin.com/in/vojt%C4%9Bch-giesl-ba2a2a220/',
          bio: 'Téměř deset let má plně na starosti vývoj a provoz softwarového produktu ve společnosti CITIQ s.r.o. Podílel se na řadě mezinárodních projektů, úzce spolupracoval s univerzitami napříč Evropou a koordinoval nespočet workshopů.',
        },
        {
          name: 'Noe Švanda',
          portrait: '/team/noe-svanda.jpg',
          linkedin: 'https://www.linkedin.com/in/noe-svanda-164166295/',
          bio: 'Má mnohaleté zkušenosti s vývojem komplexních softwarových platforem pro veřejný sektor i soukromé společnosti, včetně Škoda Group. Věnuje se webovým systémům, mobilním aplikacím i řešením využívajícím umělou inteligenci.',
        },
      ],
    },
    contactPage: {
      title: 'Co spolu vytvoříme?',
      intro:
        'Zajímá vás některý z našich produktů? Nebo hledáte partnera pro vlastní projekt? Napište nám, co potřebujete vyřešit.',
      email: 'Napište nám',
      phone: 'Zavolejte nám',
      details: 'Firemní údaje',
      address: 'Sídlo',
      registration: 'IČO',
      prompt:
        'Stačí pár vět o vašem záměru, současném řešení a o tom, co by se mělo změnit.',
    },
    closing: {
      title: 'Máte něco na mysli?',
      text: 'Pojďme probrat, jak vám mohou naše produkty nebo zkušenosti pomoci.',
    },
    footer: {
      text: 'Vlastní produkty. Promyšlená řešení. Přímá spolupráce.',
      company: 'Společnost',
      privacy: 'Informace',
      settings: 'Nastavení cookies',
    },
    consent: {
      title: 'Pomůžete nám porozumět návštěvnosti?',
      text: 'S vaším souhlasem použijeme Google Analytics k měření návštěvnosti. Bez souhlasu se analytika nespustí. Volbu můžete kdykoli změnit v patičce.',
      accept: 'Povolit analytiku',
      reject: 'Odmítnout analytiku',
      close: 'Zavřít',
      saved: 'Vaše volba byla uložena.',
    },
    datahub: {
      name: 'DataHub',
      category: 'Data & infrastruktura',
      headline: 'Z dat přehled. Z přehledu rozhodnutí.',
      summary:
        'Zařízení, místa a provozní data v jednom kontextu. DataHub vám pomáhá sledovat infrastrukturu, rozumět změnám a řešit události.',
      audience:
        'Pro týmy, které spravují zařízení, sledují infrastrukturu a potřebují se vyznat v živých i historických datech.',
      features: [
        {
          title: 'Zařízení na správném místě',
          text: 'Katalog zařízení, jejich připojení a historie instalací propojené s oblastmi, místy a monitorovacími body.',
        },
        {
          title: 'Data v souvislostech',
          text: 'Živá i historická telemetrie, mapy, porovnání a přehledy pomáhají vidět víc než jednotlivá čísla.',
        },
        {
          title: 'Upozornění s návazností',
          text: 'Od zachycení události přes přiřazení a komentáře až po její vyřešení. Provozní události mají svůj kontext.',
        },
        {
          title: 'Výstupy pro další práci',
          text: 'Importy, analytika, reporty a řízené zveřejnění dat pro další týmy i veřejnost.',
        },
      ],
      steps: [
        'Připojte zdroje dat',
        'Usaďte je do mapy provozu',
        'Sledujte, vyhodnocujte, reagujte',
      ],
      cta: 'Domluvit ukázku DataHubu',
    },
    tickets: {
      name: 'Dáme lístky',
      category: 'Akce & vstupenky',
      headline: 'Vaše akce. Jejich zážitek.',
      summary:
        'Dejte své akci prostor vyniknout. Dáme lístky propojuje pořadatele s publikem a drží cestu od prvního zájmu až po vstup na akci pohromadě.',
      audience:
        'Pro lidi, kteří přivádějí kulturu k životu. Pořadatele, kluby, divadla i festivaly — od komorního večera po akci, na kterou se těší celé město.',
      features: [
        {
          title: 'Vaše akce v hlavní roli',
          text: 'Každá akce má vlastní atmosféru. Dejte jí podobu, která osloví vaše publikum, a nabídněte vstupenky i místa tak, jak to vašemu prostoru dává smysl.',
        },
        {
          title: 'Přehled od prvního zájmu',
          text: 'Pro návštěvníky srozumitelná cesta k nákupu. Pro vás přehled o rezervacích, objednávkách a dostupných místech, se kterým se dá plánovat další krok.',
        },
        {
          title: 'Blíž svému publiku',
          text: 'Nákupem to nekončí. Doručení vstupenek a navazující komunikace jsou součástí zážitku, který začíná dávno před otevřením dveří.',
        },
        {
          title: 'Dobrý začátek už u dveří',
          text: 'Přivítejte své návštěvníky s přehledem. Ověření vstupenek a společné zázemí pro váš tým pomáhají udržet pozornost tam, kam patří — u samotné akce.',
        },
      ],
      steps: [
        'Dejte své akci podobu',
        'Pozvěte své publikum',
        'Proměňte vstupenky v zážitky',
      ],
      cta: 'Probrat naši akci',
    },
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      datahub: 'DataHub',
      tickets: 'Dáme lístky',
      about: 'About us',
      contact: 'Contact',
      legal: 'Legal information',
      privacy: 'Privacy',
      cookies: 'Cookies',
    },
    meta: {
      home: {
        title: 'Software that connects',
        description:
          'We are NOVOSense. We build DataHub for infrastructure data, Dáme lístky for event organizers, and custom software.',
      },
      products: {
        title: 'Our products',
        description:
          'Two products, one approach. DataHub connects devices and operational data. Dáme lístky connects organizers and audiences.',
      },
      datahub: {
        title: 'DataHub — understand your infrastructure',
        description:
          'Devices, telemetry, maps and alerts in context. Meet DataHub, our operational data and IoT platform.',
      },
      tickets: {
        title: 'Dáme lístky — from the first ticket to the last guest',
        description:
          'Your event, closer to its audience. Dáme lístky brings event presentation, ticket sales and welcoming guests together.',
      },
      about: {
        title: 'About us',
        description:
          'Vojtěch Giesl and Noe Švanda. Meet the people behind NOVOSense and learn about their experience in software, infrastructure and international projects.',
      },
      contact: {
        title: 'Contact',
        description:
          'Interested in DataHub, Dáme lístky or custom development? Get in touch with NOVOSense directly.',
      },
      legal: {
        title: 'Legal information',
        description:
          'Company identification and information about the NOVOSense website.',
      },
      privacy: {
        title: 'Privacy',
        description:
          'How NOVOSense handles information about website visitors and people who contact us.',
      },
      cookies: {
        title: 'Cookies and consent settings',
        description:
          'Information about browser storage, optional analytics and your choices.',
      },
    },
    skip: 'Skip to content',
    menu: 'Menu',
    language: 'Change language',
    contact: 'Let’s talk',
    explore: 'Explore the product',
    home: {
      eyebrow: 'NOVOSense / software with a purpose',
      title: 'Good ideas.',
      accent: 'Working software.',
      intro:
        'We connect data, people and everyday operations. We build our own products and help companies turn their needs into useful software.',
      productTitle: 'Two worlds. The same care.',
      productIntro:
        'From sensor readings to a full house. We build our products around the real needs of the people who use them.',
      servicesTitle: 'Your project could be next.',
      servicesIntro:
        'Alongside our own products, we build custom software. We step in when an off-the-shelf solution falls short or systems need to talk to each other.',
      services: [
        {
          title: 'Custom development',
          text: 'Web applications and internal tools designed around the way your team actually works.',
        },
        {
          title: 'Connected systems',
          text: 'APIs, data flows and integrations that get information where you need it.',
        },
        {
          title: 'From idea to operation',
          text: 'Together we clarify the brief, validate the solution and prepare the application for everyday use.',
        },
      ],
      teamTitle: 'People behind the software. Two of us.',
      teamText:
        'We are a small team with direct responsibility for what we build. You speak with the people who think through your project and bring it to life.',
    },
    product: {
      label: 'A product by NOVOSense',
      capabilities: 'What you can do',
      workflow: 'From the first step to the outcome',
      sample: 'Illustration · sample data',
      audience: 'Who it’s for',
      back: 'All products',
    },
    products: {
      title: 'Software for real operations.',
      intro:
        'Two different fields. A shared focus on clarity, connected workflows and practical use.',
    },
    about: {
      eyebrow: 'About us',
      title: 'The people behind NOVOSense.',
      intro:
        'We’re Vojtěch and Noe. We bring together experience in software development, infrastructure and international projects.',
      people: [
        {
          name: 'Vojtěch Giesl',
          portrait: '/team/vojtech-giesl.jpg',
          linkedin: 'https://www.linkedin.com/in/vojt%C4%9Bch-giesl-ba2a2a220/',
          bio: 'For nearly ten years, Vojtěch has been fully responsible for developing and operating the software product at CITIQ s.r.o. He has contributed to numerous international projects, worked closely with universities across Europe and coordinated countless workshops.',
        },
        {
          name: 'Noe Švanda',
          portrait: '/team/noe-svanda.jpg',
          linkedin: 'https://www.linkedin.com/in/noe-svanda-164166295/',
          bio: 'Noe has many years of experience developing complex software platforms for the public sector and private companies, including Škoda Group. His work spans web systems, mobile applications and solutions built with artificial intelligence.',
        },
      ],
    },
    contactPage: {
      title: 'What shall we build together?',
      intro:
        'Interested in one of our products? Looking for a partner for your own project? Tell us what you need to solve.',
      email: 'Write to us',
      phone: 'Call us',
      details: 'Company details',
      address: 'Registered office',
      registration: 'Company ID',
      prompt:
        'A few sentences about your idea, your current setup and what you would like to change are enough to start.',
    },
    closing: {
      title: 'Something on your mind?',
      text: 'Let’s talk about how our products or experience could help.',
    },
    footer: {
      text: 'Our own products. Thoughtful solutions. Direct collaboration.',
      company: 'Company',
      privacy: 'Information',
      settings: 'Cookie settings',
    },
    consent: {
      title: 'Help us understand our audience?',
      text: 'With your permission, we use Google Analytics to measure visits. Analytics stays off without consent. You can change your choice in the footer at any time.',
      accept: 'Allow analytics',
      reject: 'Reject analytics',
      close: 'Close',
      saved: 'Your choice has been saved.',
    },
    datahub: {
      name: 'DataHub',
      category: 'Data & infrastructure',
      headline: 'From data to insight. From insight to action.',
      summary:
        'Devices, places and operational data in context. DataHub helps you monitor infrastructure, understand changes and manage events.',
      audience:
        'For teams managing devices and infrastructure who need to make sense of live and historical data.',
      features: [
        {
          title: 'Devices in the right place',
          text: 'A device catalog, onboarding and installation history connected to operational areas, places and monitoring points.',
        },
        {
          title: 'Data with context',
          text: 'Live and historical telemetry, maps, comparisons and dashboards help you see beyond individual readings.',
        },
        {
          title: 'Alerts with a next step',
          text: 'From detection through assignment and comments to resolution. Operational events stay connected to their context.',
        },
        {
          title: 'Outputs you can use',
          text: 'Imports, analytics, reports and controlled data publishing for other teams and the public.',
        },
      ],
      steps: [
        'Connect your data sources',
        'Map your operational context',
        'Monitor, evaluate, respond',
      ],
      cta: 'Request a DataHub demo',
    },
    tickets: {
      name: 'Dáme lístky',
      category: 'Events & tickets',
      headline: 'Your event. Their experience.',
      summary:
        'Give your event room to shine. Dáme lístky connects organizers with their audience, bringing the journey from first interest to arrival at the door together.',
      audience:
        'For the people who bring culture to life. Organizers, clubs, theatres and festivals — from an intimate evening to an event the whole town is looking forward to.',
      features: [
        {
          title: 'Put your event centre stage',
          text: 'Every event has its own atmosphere. Present yours in a way that speaks to your audience, with tickets and seating shaped around your venue.',
        },
        {
          title: 'Clarity from the first interest',
          text: 'A clear path to purchase for your guests. A view of reservations, orders and available places for you, so you can plan what comes next.',
        },
        {
          title: 'Closer to your audience',
          text: 'The purchase is only the beginning. Ticket delivery and the communication that follows are part of an experience that starts long before the doors open.',
        },
        {
          title: 'A good start at the door',
          text: 'Welcome your guests with confidence. Ticket validation and a shared workspace for your team help keep the focus where it belongs — on the event itself.',
        },
      ],
      steps: [
        'Give your event its shape',
        'Invite your audience',
        'Turn tickets into experiences',
      ],
      cta: 'Let’s discuss your event',
    },
  },
} satisfies Record<Locale, Copy>;
