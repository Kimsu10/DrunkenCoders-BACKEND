# drunkenCoders

- 프로젝트 모티브 사이트 -> **drunkenCoders** (https://www.sooldamhwa.com/)

## 기획의도

- WEstagram에서 배운 것을 바탕으로 기본적인 CRUD를 구현하고 추가적인 기능을 더 넣어보았다.
- 각자의 컴퓨터에서 통신하던것을 프론트분들과 소통하며 맞추어 가는 것을 중요시하였다.

## 개발 기간
- 2022/10/31 ~ 2022/11/11 (2주)

## 팀원 
### Front-end Developers
- 김건우 , 안상준, 곽종범, 조은혜

### Back-end Developers

- 김수정, 서재선, 오현상

## 핵심 기능

- 인증, 인가 구현 (로그인과 회원가입 기능 구현)
- 전체 상품 조회 기능 구현
- 상품 필터링 및 정렬 기능 구현
- 장바구니 CRUD 기능 구현


## 기대 효과

- 술에 대한 인식 개선 
- 나와 같은 취미를 가진 사람들을 만날 기회가 적다. -> 나와 같은 취미를 가진 사람들과 커뮤니티를 형성할 수 있다.
- 건강한 삶과는 거리가 멀다. -> 취미활동을 통해 건강한 삶을 영위할 수 있다.

## :fire: Project Archive

- [Notion](https://www.notion.so/1-Drunken-Coders-2ea81c5780ca452ea09db871d7802dce)
- [Trello](https://trello.com/b/1kPwwMTz/drunkencodersall)


##  기술 스택

- JavaScript
- Nodejs + Express Framework
- AWS (Amazon Web Service 간단하게 배포)
- MySQL 

## 적용 기술


### Back-End

|                                             JavaScript                                             |                                                Nodejs                                                 |                                                 MySql                                                 |                                                  Rest                                                   |
| :------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /> |

### Common

- common : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=AmazonAWS&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=AmazonAWS&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white"/>
- 협업툴 : <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/> <img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/> <img src="https://img.shields.io/badge/PostMan-FF6C37?style=flat&logo=PostMan&logoColor=white"/>

##  ERD 

<p align = "center">
<img src="[https://ifh.cc/g/wQF1qX.jpg](https://velog.velcdn.com/images/kimsu10/post/ec26b331-19d5-4844-9b6a-57d175745adc/image.png)">
</p>

## :fire: 구현 기능 (Front-end & Back-end)

### 각 기능 별 메인 로직 

1. 장바구니 CRUD
```
const addCart = async (userId, productId, quantity) => {

  const result = await AppDataSource.query(
    `
      INSERT INTO cart(
      user_id,
      product_id,
      quantity
      )
      values(?,?,?);`,
    [userId, productId, quantity]
  );
  return result;
};

const checkCart = async (userId) => {
  const result = await AppDataSource.query(
    `
      SELECT 
        c.id,
        c.user_id,
        c.product_id,
        c.quantity,
        p.name,
        p.price,
        pi.image_url
      FROM cart c
      JOIN products p ON c.product_id = p.id
      JOIN product_images pi ON pi.id = p.id
      WHERE c.user_id = ?
      `,
    [userId]
  );
  return result;
};

const changeCart = async (quantity, cartId, userId) => {
  const result = await AppDataSource.query(
    `
      UPDATE cart
      SET quantity = ?
      WHERE id= ? AND user_id= ?
  `,
    [quantity, cartId, userId]
  );
  return result;
};

const deleteCart = async (userId, cartId) => {
  const result = await AppDataSource.query(
    `
      DELETE FROM cart
      WHERE id = ? AND user_id = ?
  `,
    [cartId, userId]
  );
  return result;
};

module.exports = {
  addCart,
  checkCart,
  changeCart,
  deleteCart,
};
```

2. 인증 인가
```
const register = async (email, password, nickname) => {
  validateEmail(email);
  validatePassword(password);

  const user = await userDao.getUserByEmail(email);

  if (user) {
    const err = new Error("duplicated email");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userDao.createUser(email, hashedPassword, nickname);
};

const login = async (email, password) => {
  console.log(email)
  const user = await userDao.getUserByEmail(email);
  console.log(user)

  if (!email.includes("@") || !email.includes(".")) {
    const err = new Error("invalid email");
    err.statusCode = 400;
    throw err;
  }

  if (!user) {
    const err = new Error("invalid user");
    err.statusCode = 404;
    throw err;
  }
  const match = await bcrypt.compare(password, user.password);
  console.log(match)
  if (!match) {
    const err = new Error("invalid password");
    err.statusCode = 401;
    throw err;
  }

  return jwt.sign({ userId: user.id }, 'kims1074');
};
```

3. 상품상세 리스트 
```
const makeWhereList = (
    cate_id , sweetness , sourness , carbon , fruit , flower , grain , priceRange , alchol ) => {
    
    const startLine = "WHERE ";
    const filter = ["p.id IS NOT NULL"];
    
    if (typeof(cate_id) == 'object'){
      const orS = cate_id.map(el => `categories_id=${el}`).join(" or ")
        filter.push(orS);
      } else if (typeof(cate_id) == 'string'){
        filter.push(`categories_id=${cate_id}`)
      };
    if (typeof(sweetness) == 'object'){
      const orS = sweetness.map(el => `sweetness_id=${el}`).join(" or ")
        filter.push(orS);
      } else if (typeof(sweetness) == 'string'){
        filter.push(`sweetness_id=${sweetness}`)
      };
    if (typeof(sourness) == 'object'){
      const orS = sourness.map(el => `sourness_id=${el}`).join(" or ")
         filter.push(orS);
      } else if (typeof(sourness) == 'string'){
        filter.push(`sourness_id=${sourness}`)
      }
    if (typeof(carbon) == 'object'){
      const orS = carbon.map(el => `carbon_id=${el}`).join(" or ")
         filter.push(orS);
      } else if (typeof(carbon) == 'string'){
         filter.push(`carbon_id=${carbon}`)
      }
    if (typeof(fruit) == 'object'){
       const orS = fruit.map(el => `fruit_id=${el}`).join(" or ")
         filter.push(orS);
      } else if (typeof(fruit) == 'string'){
         filter.push(`fruit_id=${fruit}`)
      }
    if (typeof(flower) == 'object'){
       const orS = flower.map(el => `flower_id=${el}`).join(" or ")
         filter.push(orS);
      } else if (typeof(flower) == 'string'){
         filter.push(`flower_id=${flower}`)
      }
    if (typeof(grain) == 'object'){
      const orS = grain.map(el => `grain_id=${el}`).join(" or ")
        filter.push(orS);
    } else if (typeof(grain) == 'string'){
        filter.push(`grain_id=${grain}`)
    }
    if (priceRange) {
      filter.push(`price BETWEEN ${priceRange[0]} AND ${priceRange[1]}`);
    }
    if (alchol) {
      filter.push(`alchol BETWEEN ${alchol[0]} AND ${alchol[1]}`)
    }
    const body = filter.join(" AND ");
    const combined = startLine + body;
    return {
      toSqlString: function () {
        return combined;
      },
    };
  };

module.exports = {makeWhereList}
```
