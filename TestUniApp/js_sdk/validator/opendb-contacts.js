// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "username": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "姓名"
  },
  "gender": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未知",
            "value": 0
          },
          {
            "text": "男",
            "value": 1
          },
          {
            "text": "女",
            "value": 2
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "性别"
  },
  "mobile": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "电话"
  },
  "email": {
    "rules": [
      {
        "format": "string"
      },
      {
        "format": "email"
      }
    ],
    "label": "邮箱"
  },
  "comment": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "备注"
  }
}

const enumConverter = {
  "gender_valuetotext": {
    "0": "未知",
    "1": "男",
    "2": "女"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
