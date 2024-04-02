const userList = [
  {
    id: 1,
    username: 'clm',
    password: 'clm',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdltzqxSPu7Xm4Dkzp5FEmfO887PJYMBtog&s',
    sex: 1,
    phone: '13896968574',
    email: 'hellafd@qq.com',
    introduction: 'this is clm info',
    status: 1,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 2,
    username: 'ter',
    password: 'ter',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCU6lbD4H4hMNVv_-VLw_g6uK-t_4fml-RQ&s',
    sex: 0,
    phone: '13896968574',
    email: 'fdsfds@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 0,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 3,
    username: 'fd',
    password: 'fd',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SJpxfBGPEPbftZUuCIjuvA2v0qadwmlUgg&s',
    sex: 0,
    phone: '13896968574',
    email: 'fdsfds@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 1,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 4,
    username: 'aaa',
    password: 'aaa',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteEWITlxUE5k4mqcUjSVTnxHaP-ZKEt7dag&s',
    sex: 0,
    phone: '13896968574',
    email: 'ccc@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 1,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 5,
    username: 'erer',
    password: 'erer',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTX_5Bj_2IOiD23RwsreKfaESaXGihvvufaQ&s',
    sex: 0,
    phone: '13896968574',
    email: 'qre@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 1,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 6,
    username: 'jjj',
    password: 'jjj',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyjMbD1VX2_fyDaA0kuVwcDpGJx4N_8CcAA&s',
    sex: 0,
    phone: '13896968574',
    email: 'aa@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 0,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 7,
    username: 'jkl',
    password: 'jkl',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFJMo-wCTXTG3UtY2tbzpX6D8li_6jlHsHw&s',
    sex: 0,
    phone: '13896968574',
    email: 'fd@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 0,
    updateTime: '2024-03-26 19:15:50'
  },
  {
    id: 8,
    username: 'ter',
    password: 'ter',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS8VHhAC2EexjoEggg3oU6KqIH8IEltB-GZQ&s',
    sex: 0,
    phone: '13896968574',
    email: 'fdsfds@qq.com',
    introduction: 'this is ter info this is ter info this is ter info this is ter info this is ter info this is ter info',
    status: 1,
    updateTime: '2024-03-26 19:15:50'
  }
]

module.exports = [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const { page, size, keyword } = config.query
      let start = (page - 1) * size
      let end = start + size
      const data = {
        total: userList.length,
        userList: userList.filter(item => item.username.includes(keyword)).slice(start, end)
      }
      // console.log(data)
      return {
        code: 200,
        message: 'retrieve user list sucess',
        data
      }
    }
  }
]