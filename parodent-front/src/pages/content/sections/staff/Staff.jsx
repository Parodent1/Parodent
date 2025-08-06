import { useMemo, useState } from "react";
import "./staff.css";

function Staff() {
  const personalCards = [
  {
    id: 2,
    name: "Кравчук Олена Ігорівна",
    role: "Doctor",
    status: "Working",
    phone: "+380631112233",
    email: "olena.kravchuk@example.com",
  },
  {
    id: 3,
    name: "Коваль Андрій Петрович",
    role: "Assistant",
    status: "Day off",
    phone: "+380932223344",
    email: "andriy.koval@example.com",
  },
  {
    id: 4,
    name: "Мельник Ірина Сергіївна",
    role: "Nurse",
    status: "Working",
    phone: "+380501234567",
    email: "iryna.melnyk@example.com",
  },
  {
    id: 5,
    name: "Шевченко Юлія Андріївна",
    role: "Administrator",
    status: "Working",
    phone: "+380957776655",
    email: "yuliya.shevchenko@example.com",
  },
  {
    id: 6,
    name: "Дяченко Роман Васильович",
    role: "Doctor",
    status: "Working",
    phone: "+380631234111",
    email: "roman.dyachenko@example.com",
  },
  {
    id: 7,
    name: "Литвин Катерина Олегівна",
    role: "Assistant",
    status: "Day off",
    phone: "+380931112222",
    email: "kateryna.lytvyn@example.com",
  },
  {
    id: 8,
    name: "Савчук Михайло Олексійович",
    role: "Nurse",
    status: "Working",
    phone: "+380951234567",
    email: "mykhailo.savchuk@example.com",
  },
  {
    id: 9,
    name: "Ткаченко Вікторія Анатоліївна",
    role: "Doctor",
    status: "Working",
    phone: "+380961234789",
    email: "victoria.tkachenko@example.com",
  },
  {
    id: 10,
    name: "Захарченко Іван Дмитрович",
    role: "Assistant",
    status: "Working",
    phone: "+380991234000",
    email: "ivan.zakharchenko@example.com",
  },
  {
    id: 11,
    name: "Петренко Олександр Юрійович",
    role: "Doctor",
    status: "Day off",
    phone: "+380981234321",
    email: "oleksandr.petrenko@example.com",
  },
  {
    id: 12,
    name: "Бондаренко Аліна Володимирівна",
    role: "Nurse",
    status: "Working",
    phone: "+380671112233",
    email: "alina.bondarenko@example.com",
  },
  {
    id: 13,
    name: "Мороз Наталія Павлівна",
    role: "Administrator",
    status: "Working",
    phone: "+380981113355",
    email: "nataliya.moroz@example.com",
  },
  {
    id: 14,
    name: "Гончар Олег Михайлович",
    role: "Doctor",
    status: "Day off",
    phone: "+380931112278",
    email: "oleh.honchar@example.com",
  },
  {
    id: 15,
    name: "Сидоренко Тетяна Олександрівна",
    role: "Assistant",
    status: "Working",
    phone: "+380631118899",
    email: "tetiana.sydorenko@example.com",
  },
  {
    id: 16,
    name: "Поляк Вадим Васильович",
    role: "Doctor",
    status: "Working",
    phone: "+380661234567",
    email: "vadym.polyak@example.com",
  },
  {
    id: 17,
    name: "Климчук Марія Іванівна",
    role: "Nurse",
    status: "Day off",
    phone: "+380991112211",
    email: "maria.klymchuk@example.com",
  },
  {
    id: 18,
    name: "Жук Сергій Петрович",
    role: "Doctor",
    status: "Working",
    phone: "+380681112233",
    email: "serhiy.zhuk@example.com",
  },
  {
    id: 19,
    name: "Онищенко Людмила Віталіївна",
    role: "Administrator",
    status: "Working",
    phone: "+380671234456",
    email: "lyudmyla.onyshchenko@example.com",
  },
  {
    id: 20,
    name: "Назаренко Павло Ігорович",
    role: "Assistant",
    status: "Day off",
    phone: "+380931234876",
    email: "pavlo.nazarenko@example.com",
  },
  {
    id: 21,
    name: "Романюк Інна Анатоліївна",
    role: "Nurse",
    status: "Working",
    phone: "+380671112244",
    email: "inna.romanyuk@example.com",
  },
  {
    id: 22,
    name: "Данилюк Юрій Богданович",
    role: "Doctor",
    status: "Working",
    phone: "+380951112266",
    email: "yuriy.danylyuk@example.com",
  },
  {
    id: 23,
    name: "Козак Ігор Степанович",
    role: "Assistant",
    status: "Working",
    phone: "+380991117788",
    email: "ihor.kozak@example.com",
  },
  {
    id: 24,
    name: "Федорчук Лариса Валеріївна",
    role: "Nurse",
    status: "Day off",
    phone: "+380961112277",
    email: "larisa.fedorchuk@example.com",
  },
  {
    id: 25,
    name: "Тимошенко Владислав Олексійович",
    role: "Doctor",
    status: "Working",
    phone: "+380671113355",
    email: "vlad.timoshenko@example.com",
  },
  {
    id: 26,
    name: "Семенюк Юлія Романівна",
    role: "Assistant",
    status: "Day off",
    phone: "+380931119988",
    email: "yulia.semenyuk@example.com",
  },
  {
    id: 27,
    name: "Іваненко Ольга Миколаївна",
    role: "Administrator",
    status: "Working",
    phone: "+380951118899",
    email: "olga.ivanenko@example.com",
  },
  {
    id: 28,
    name: "Гаврилюк Микита Євгенович",
    role: "Doctor",
    status: "Working",
    phone: "+380981118811",
    email: "mykyta.havrylyuk@example.com",
  },
  {
    id: 29,
    name: "Власюк Христина Ігорівна",
    role: "Nurse",
    status: "Working",
    phone: "+380681114455",
    email: "khrystyna.vlasyuk@example.com",
  },
  {
    id: 30,
    name: "Черненко Артем Сергійович",
    role: "Assistant",
    status: "Day off",
    phone: "+380991114477",
    email: "artem.chernenko@example.com",
  },
];

  const [search, setSearch] = useState("")
  const [sortBy, setsortBy] = useState("Name A–Z")

  const filteredCards = useMemo(() => {
    const searchLower = search.toLowerCase();

    return personalCards
      .filter((card) =>
        [card.name, card.role, card.status, card.phone, card.email]
          .some(field => field.toLowerCase().includes(searchLower))
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "status") {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
  }, [search, sortBy, personalCards]);


  function statusClass(status) {
    switch(status) {
      case "Working" :
        return "working"
      case "Day off" :
        return "dayOff"
      default :
        return ""
    }
  }

  return (
    <div className="staffBody">
      <div className="staffContent">
        <div className="staffHeader">
          <h5>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              person
            </span>
            Name
          </h5>
          <h5>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              business_center
            </span>
            Role
          </h5>
          <h5>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              check_box
            </span>
            Status
          </h5>
          <h5>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              phone_enabled
            </span>
            Phone
          </h5>
          <h5>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              alternate_email
            </span>
            E-mail
          </h5>
        </div>
        <div className="cardsContainer">
          {personalCards.map((Card, index) => (
            <div className="personalCardBody" key={index}>
              <h5>{Card.name}</h5>
              <h5>{Card.role}</h5>
              <h5>
                <div className={`statusCircle ${statusClass(Card.status)}`}></div>
                {Card.status}
              </h5>
              <h5>{Card.phone}</h5>
              <h5>{Card.email}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staff;
