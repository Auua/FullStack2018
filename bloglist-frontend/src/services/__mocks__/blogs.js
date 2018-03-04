let token = null

const blogs = [
  {
    id: "5a92632c9db97a308b4b7dc5",
    title: "Reastilla",
    author: "tesmi",
    url: "https://reactpatterns.com/",
    likes: 19,
    user: {
      _id: "5a9260da0ffb3d306b380942",
      username: "testi",
      name: "Nimi"
    }
  },
  {
    id: "5a9aa773377cdf408b61ec84",
    title: "kokeilu",
    author: "uusi",
    url: "url",
    likes: 5,
    user: {
      _id: "5a92dde84684b233721ac7c5",
      username: "nimimerkki",
      name: "body name"
    }
  },
  {
    id: "5a9aa90d377cdf408b61ec87",
    title: "vielä",
    author: "yksi",
    url: "kerta",
    likes: 9,
    user: {
      _id: "5a92dde84684b233721ac7c5",
      username: "nimimerkki",
      name: "body name"
    }
  },
  {
    id: "5a9aa930377cdf408b61ec88",
    title: "joko",
    author: "nyt ",
    url: "okein",
    likes: 6,
    user: {
    _id: "5a92dde84684b233721ac7c5",
    username: "nimimerkki",
    name: "body name"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }