/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "30px": "30px",
        "40px": "40px",
        "50px": "50px",
        "55px": "55px",
        "70px": "70px",
        "100px": "100px",
        "150px": "130px",
        "160px": "160px",
        "180px": "180px",
        "200px": "200px",
        "250px": "250px",
        "260px": "255px",
        "280px": "280px",
        "290px": "290px",
        "300px": "300px",
        "400px": "350px",
        "n10px": "-10px",
        "n50p": "-50%",
        "100p": "100%",
      },
      minWidth: {
        "200px": "200px",
      },
      colors: {
        "dark": "#151515",
        "normal": "#565656",
        "darkgrey": "#999",
        "grey": "#ccc",
        "lightgrey": "#eee",
        "primary": "#093d65",
        "primarydark": "#07194a",
        "secondary": "#f98d53",
        "secondarydark": "#d12a04",
      },
      fontSize: {
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "22px": "22px",
        "24px": "24px",
        "26px": "26px",
        "28px": "28px",
        "29px": "29px",
        "30px": "30px",
        "32px": "32px",
        "35px": "35px",
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'normal':"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        'image': "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        
      },
      transitionProperty: {
        "transform": "transform",
      }
    },
  },
  plugins: [],
}

