import HomePageImg from "../assets/images/banner1.png";

// export const NEXT_PUBLIC_API_URL = "http://localhost:5000/api/user/";
export const NEXT_PUBLIC_API_URL = "https://lovefools-backend.vercel.app/api/user/";


export const API_ENDPOINT = {
  GET_TESTIMONIAL_LIST: "getTestimonialList",
  ADD_CONTACT: "addContact",
  GET_EVENTS: "getEventList",
  GET_CMS: "getCMSList",
  GET_GALLERY: "getGalleryList",
  GET_GALLERY_LIST_BY_USER: "getGalleryListByUser",
  GET_FILE: (id) => `${NEXT_PUBLIC_API_URL}file/${id}`,
  GET_MENU_LIST:'getMenuList',
  GET_ROOM_LIST:'getRoomList',
  GET_BOOK_LIST:'getBookList',
  ADD_RECEIPT: 'addReceipt',
  GET_UPCOMING_EVENT: 'getUpComingEventList',
  ADD_ENQUIRY: 'addEnquiry',
  PAYMENT_AUTH: 'initiatePayment',
};

export const ERROR_MESSAGES = "This field is required";


export const AboutUsSection =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eligendi odit, tempora minima exercitationem consequatur veniam pariatur distinctio velit et nisi maiores nulla soluta tenetur. Eos nam perferendis animi eligendi.\nLorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eligendi odit, tempora minima exercitationem consequatur veniam pariatur distinctio velit et nisi maiores nulla soluta tenetur. Eos nam perferendis animi eligendi\nLorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eligendi odit, tempora minima exercitationem consequatur veniam pariatur distinctio velit et nisi maiores nulla soluta tenetur. Eos nam perferendis animi eligendi";


  export const options = [
    { value: 1, label: "Table-1" },
    { value: 2, label: "Table-2" },
    { value: 3, label: "Table-3" },
    { value: 4, label: "Table-4" },
    { value: 5, label: "Table-5" },
  ];

  export const options2 = [
    { value: 1, label: "Table-1", image:"" },
    { value: 2, label: "Table-2", image:"" },
    { value: 3, label: "Table-3", image:"" },
    { value: 4, label: "Table-4", image:"" },
    { value: 5, label: "Table-5", image:"" },
  ];
  
  export const MenuType = [
    "All","Veg","NonVeg","Drink"
  ]

 export const items = [
    {
      event_Name: "Welcome",
      description: "to Lovefools",
      photo: HomePageImg,
      viveBtn:'View More'
    },
  ];

  export const menuType = [
    {
      id: '1',
      type: 'Ala Carte',
    },
    {
      id: '2',
      type: 'Set Menu',
    },
  ];