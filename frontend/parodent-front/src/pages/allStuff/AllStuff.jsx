import React from 'react'
import './allStuff.css'
import Logo from '../../components/logo/Logo'
import NavBar from '../../components/navBar/NavBar'


import { useAuth } from "../../context/AuthContext.jsx";

function AllStuff() {
    const { logout, user } = useAuth()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const stuff = [
        {
          name: "Тодосюк Данило Євгенович",
          role: "асистент",
          room: "2",
          number: "+38 (063) 272 50 59",
          email: "yura0092@gmail.com"
        },
        {
          name: "Іваненко Марія Петрівна",
          role: "лікар",
          room: "1",
          number: "+38 (050) 123 45 67",
          email: "ivanenko.maria@gmail.com"
        },
        {
          name: "Коваленко Сергій Іванович",
          role: "асистент",
          room: "3",
          number: "+38 (097) 765 43 21",
          email: "serhiy.koval@gmail.com"
        },
        {
          name: "Мельник Ольга Василівна",
          role: "лікар",
          room: "4",
          number: "+38 (063) 111 22 33",
          email: "olga.melnyk@clinic.com"
        },
        {
          name: "Шевченко Дмитро Олександрович",
          role: "асистент",
          room: "5",
          number: "+38 (093) 444 55 66",
          email: "d.shevchenko@gmail.com"
        },
        {
          name: "Романюк Тетяна Ігорівна",
          role: "лікар",
          room: "6",
          number: "+38 (068) 777 88 99",
          email: "t.romaniuk@clinic.com"
        },
        {
          name: "Григоренко Анастасія Юріївна",
          role: "асистент",
          room: "7",
          number: "+38 (073) 888 00 11",
          email: "nastya.g@gmail.com"
        },
        {
          name: "Олійник Владислав Віталійович",
          role: "лікар",
          room: "8",
          number: "+38 (099) 222 33 44",
          email: "v.oliinyk@gmail.com"
        },
        {
          name: "Савчук Катерина Михайлівна",
          role: "асистент",
          room: "9",
          number: "+38 (067) 555 66 77",
          email: "katya.savchuk@clinic.com"
        },
        {
          name: "Петренко Андрій Степанович",
          role: "лікар",
          room: "10",
          number: "+38 (096) 999 88 77",
          email: "a.petrenko@gmail.com"
        },
        {
          name: "Бондар Ірина Василівна",
          role: "асистент",
          room: "11",
          number: "+38 (066) 333 22 11",
          email: "iryna.bondar@gmail.com"
        },        {
            name: "Тодосюк Данило Євгенович",
            role: "асистент",
            room: "2",
            number: "+38 (063) 272 50 59",
            email: "yura0092@gmail.com"
          },
          {
            name: "Іваненко Марія Петрівна",
            role: "лікар",
            room: "1",
            number: "+38 (050) 123 45 67",
            email: "ivanenko.maria@gmail.com"
          },
          {
            name: "Коваленко Сергій Іванович",
            role: "асистент",
            room: "3",
            number: "+38 (097) 765 43 21",
            email: "serhiy.koval@gmail.com"
          },
          {
            name: "Мельник Ольга Василівна",
            role: "лікар",
            room: "4",
            number: "+38 (063) 111 22 33",
            email: "olga.melnyk@clinic.com"
          },
          {
            name: "Шевченко Дмитро Олександрович",
            role: "асистент",
            room: "5",
            number: "+38 (093) 444 55 66",
            email: "d.shevchenko@gmail.com"
          },
          {
            name: "Романюк Тетяна Ігорівна",
            role: "лікар",
            room: "6",
            number: "+38 (068) 777 88 99",
            email: "t.romaniuk@clinic.com"
          },
          {
            name: "Григоренко Анастасія Юріївна",
            role: "асистент",
            room: "7",
            number: "+38 (073) 888 00 11",
            email: "nastya.g@gmail.com"
          },
          {
            name: "Олійник Владислав Віталійович",
            role: "лікар",
            room: "8",
            number: "+38 (099) 222 33 44",
            email: "v.oliinyk@gmail.com"
          },
          {
            name: "Савчук Катерина Михайлівна",
            role: "асистент",
            room: "9",
            number: "+38 (067) 555 66 77",
            email: "katya.savchuk@clinic.com"
          },
          {
            name: "Петренко Андрій Степанович",
            role: "лікар",
            room: "10",
            number: "+38 (096) 999 88 77",
            email: "a.petrenko@gmail.com"
          },
          {
            name: "Бондар Ірина Василівна",
            role: "асистент",
            room: "11",
            number: "+38 (066) 333 22 11",
            email: "iryna.bondar@gmail.com"
          },        {
            name: "Тодосюк Данило Євгенович",
            role: "асистент",
            room: "2",
            number: "+38 (063) 272 50 59",
            email: "yura0092@gmail.com"
          },
          {
            name: "Іваненко Марія Петрівна",
            role: "лікар",
            room: "1",
            number: "+38 (050) 123 45 67",
            email: "ivanenko.maria@gmail.com"
          },
          {
            name: "Коваленко Сергій Іванович",
            role: "асистент",
            room: "3",
            number: "+38 (097) 765 43 21",
            email: "serhiy.koval@gmail.com"
          },
          {
            name: "Мельник Ольга Василівна",
            role: "лікар",
            room: "4",
            number: "+38 (063) 111 22 33",
            email: "olga.melnyk@clinic.com"
          },
          {
            name: "Шевченко Дмитро Олександрович",
            role: "асистент",
            room: "5",
            number: "+38 (093) 444 55 66",
            email: "d.shevchenko@gmail.com"
          },
          {
            name: "Романюк Тетяна Ігорівна",
            role: "лікар",
            room: "6",
            number: "+38 (068) 777 88 99",
            email: "t.romaniuk@clinic.com"
          },
          {
            name: "Григоренко Анастасія Юріївна",
            role: "асистент",
            room: "7",
            number: "+38 (073) 888 00 11",
            email: "nastya.g@gmail.com"
          },
          {
            name: "Олійник Владислав Віталійович",
            role: "лікар",
            room: "8",
            number: "+38 (099) 222 33 44",
            email: "v.oliinyk@gmail.com"
          },
          {
            name: "Савчук Катерина Михайлівна",
            role: "асистент",
            room: "9",
            number: "+38 (067) 555 66 77",
            email: "katya.savchuk@clinic.com"
          },
          {
            name: "Петренко Андрій Степанович",
            role: "лікар",
            room: "10",
            number: "+38 (096) 999 88 77",
            email: "a.petrenko@gmail.com"
          },
          {
            name: "Бондар Ірина Василівна",
            role: "асистент",
            room: "11",
            number: "+38 (066) 333 22 11",
            email: "iryna.bondar@gmail.com"
          }
      ];
    return (
        <div className='allStuffBody'>
            <Logo />
            <NavBar />
            <div className="allStuffContent">
  <div className="allStuffListHeader">
    <h1 className="headerNames headerItems">ПІБ</h1>
    <h1 className="headerRoles headerItems">Посада</h1>
    <h1 className="headerRooms headerItems">Кабінет</h1>
    <h1 className="headerNumbers headerItems">Телефон</h1>
    <h1 className="headerEmails headerItems">E-mail</h1>
  </div>

  <div className="allStuffListItems">
    {stuff.map((person, index) => (
      <React.Fragment key={index}>
        <div className="ItemsNames listItem">{person.name}</div>
        <div className="ItemsRoles listItem">{person.role}</div>
        <div className="ItemsRooms listItem">{person.room}</div>
        <div className="ItemsNumbers listItem">{person.number}</div>
        <div className="ItemsEmails listItem">{person.email}</div>
      </React.Fragment>
    ))}
  </div>
</div>
            <button className="logOutBtn" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default AllStuff