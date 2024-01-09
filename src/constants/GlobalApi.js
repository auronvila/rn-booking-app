import {request, gql} from 'graphql-request'
import {MASTER_URL} from '@env';


const getSlider = async () => {
  const query = gql`
  query GetSlider {
  sliders {
      id
      name
      image {
        url
      }
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

export const getCategories = async () => {
  const query = gql`
  query GetCategory {
  categories {
    name
    icon {
      url
    }
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

export const getBusnissesList = async () => {
  const query = gql`
query GetBusinessList {
  businessLists {
    id
    name
    contactPerson
    email
    address
    about
    images {
      url
    }
    category {
      name
    }
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

export const getBusnissesListByCategory = async (category) => {
  const query = gql`
query GetBusinessList {
  businessLists(where: {category: {name: "${category}"}}) {
    id
    name
    contactPerson
    email
    address
    about
    images {
      url
    }
    category {
      name
    }
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

export const createBooking = async (data) => {
  const mutationQuery = gql`
mutation createBooking {
  createBooking(
    data: {bookingStatus: Booked,
     businessList: {connect: {id: "${data.businessId}"}},
      date: "${data.date}", 
      time: "${data.time}", 
      userEmail: "${data.userEmail}", 
      userName: "${data.userName}"
      }
  ) {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
}
`
  const result = await request(MASTER_URL, mutationQuery)
  return result
}


export const getUserBookings = async (userEmail) => {
  const query = gql`
query GetUserBookings {
  bookings(orderBy: updatedAt_DESC, where: {userEmail: "${userEmail}"}) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
    businessList {
      id
      images {
        url
      }
      name
      address
      email
      about
    }
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}


export default {getSlider, getUserBookings,getCategories, getBusnissesList, createBooking, getBusnissesListByCategory}

