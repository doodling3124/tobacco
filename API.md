### POST /sales_data/ 

请求:

```
{
    "brand": "中华",
    "pack_type": "硬盒",
    "diameter": "中支",
    "taste": "烤烟型",
    "start_date": "2024-01-01",
    "end_date": "2024-02-01"
}
```

响应:

```
{
    "code": 0,
    "data": [
        {
            "date": "2024-01",
            "region": "西北地区",
            "value": 36181
        },
        {
            "date": "2024-01",
            "region": "华北地区",
            "value": 46641
        },
        {
            "date": "2024-01",
            "region": "东北地区",
            "value": 33351
        },
        {
            "date": "2024-01",
            "region": "华中地区",
            "value": 34606
        },
        {
            "date": "2024-01",
            "region": "华东地区",
            "value": 38807
        },
        {
            "date": "2024-01",
            "region": "华南地区",
            "value": 30368
        },
        {
            "date": "2024-01",
            "region": "西南地区",
            "value": 36873
        },
        {
            "date": "2024-02",
            "region": "西北地区",
            "value": 37121
        },
        {
            "date": "2024-02",
            "region": "华北地区",
            "value": 35876
        },
        {
            "date": "2024-02",
            "region": "东北地区",
            "value": 42555
        },
        {
            "date": "2024-02",
            "region": "华中地区",
            "value": 47872
        },
        {
            "date": "2024-02",
            "region": "华东地区",
            "value": 47669
        },
        {
            "date": "2024-02",
            "region": "华南地区",
            "value": 31664
        },
        {
            "date": "2024-02",
            "region": "西南地区",
            "value": 46914
        }
    ],
    "msg": "操作成功！"
}
```

### GET /brands/structure

响应:

```
{
    "code": 0,
    "data": [
        {
            "level": "高端",
            "value": 127
        },
        {
            "level": "低端",
            "value": 127
        },
        {
            "level": "中端",
            "value": 106
        }
    ],
    "msg": "操作成功！"
}
```

### GET /sales_data/price_range

响应:

```
{
    "code": 0,
    "data": [
        {
            "scope": "每盒 5元以下",
            "value": "30286016"
        },
        {
            "scope": "每盒 5元-10元",
            "value": "110680341"
        },
        {
            "scope": "每盒 10元到30元",
            "value": "383389643"
        },
        {
            "scope": "每盒 30元-50元",
            "value": "332674668"
        },
        {
            "scope": "每盒 50元及以上",
            "value": "353178567"
        }
    ],
    "msg": "操作成功！"
}
```

### GET /customers

响应:

```
{
    "code": 0,
    "data": [
        {
            "address": "湖南省彬市闵行孙街a座 848892",
            "customer_name": "杨秀华",
            "key": 1,
            "level": 2,
            "telephone": "13090898326"
        },
        {
            "address": "福建省海门县海陵天津路T座 166000",
            "customer_name": "唐刚",
            "key": 2,
            "level": 3,
            "telephone": "18546851702"
        },
        ...
    ],
    "msg": "操作成功！"
}
```

### POST /customers/details

请求:

```
{
    "id": 1
}
```

响应:

```
{
    "code": 0,
    "data": {
        "main_selling_spec": [
            {
                "specification": "软盒/粗支/烤烟型",
                "value": 10
            },
            ...
        ],
        "order_full_rate": [
            {
                "date": "2024-01",
                "value": "0.97"
            },
            ...
            {
                "date": "2024-12",
                "value": "0.78"
            }
        ]
    },
    "msg": "操作成功！"
}
```

### GET /actual_price

响应:

```
{
    "code": 0,
    "data": [
        {
            "actual_price": "30.00",
            "advice_price": 40,
            "brand": "中华",
            "region": "西北地区",
            "specification": "硬盒/粗支/烤烟型"
        },
        {
            "actual_price": "50.00",
            "advice_price": 40,
            "brand": "中华",
            "region": "华北地区",
            "specification": "硬盒/粗支/烤烟型"
        },
        ...
        ],
    "msg": "操作成功！"
}
```

### POST /actual_price

请求:

```
{
    "brand": "中华",
    "pack_type": "硬盒",
    "diameter": "粗支",
    "taste": "烤烟型",
    "region": "华北地区"
}
```

响应:

```
{
    "code": 0,
    "data": {
        "advice_price": 40,
        "difference_values": [
            {
                "date": "2024-01",
                "difference": "7.00"
            },
            ...
            {
                "date": "2024-12",
                "difference": "10.00"
            }
        ]
    },
    "msg": "操作成功！"
}
```

### POST /sales_data/contrast_brand

请求:

```
{
    "main_brand": "中华",
    "contrast_brand": ["和天下", "芙蓉王"],
    "start_date": "2024-01-01",
    "end_date": "2024-08-01"
}
```

响应:

```
{
    "code": 0,
    "data": [
        {
            "brand": "中华",
            "value": "40198826"
        },
        {
            "brand": "和天下",
            "value": "40368984"
        },
        {
            "brand": "芙蓉王",
            "value": "40415016"
        }
    ],
    "msg": "操作成功！"
}
```

### POST /sales_data/main_brand

请求:

```
{
    "main_brand": "中华",
    "start_date": "2024-01-01",
    "end_date": "2024-08-01"
}
```

响应:

```
{
    "code": 0,
    "data": {
        "Line": {
            "diameter": [
                {
                    "date": "2024-01",
                    "specification": "粗支",
                    "value": "167"
                },
                ...
                {
                    "date": "2024-08",
                    "specification": "中支",
                    "value": "167"
                }
            ],
            "pack_type": [
                {
                    "date": "2024-01",
                    "specification": "硬盒",
                    "value": "246"
                },
                ...
                {
                    "date": "2024-08",
                    "specification": "软盒",
                    "value": "250"
                }
            ],
            "taste": [
                {
                    "date": "2024-01",
                    "specification": "烤烟型",
                    "value": "162"
                },
                ...
                {
                    "date": "2024-08",
                    "specification": "薄荷型",
                    "value": "165"
                }
            ]
        },
        "Pie": {
            "diameter": [
                {
                    "diameter": "粗支",
                    "value": 34
                },
                {
                    "diameter": "中支",
                    "value": 33
                },
                {
                    "diameter": "细支",
                    "value": 33
                }
            ],
            "pack_type": [
                {
                    "pack_type": "硬盒",
                    "value": 50
                },
                {
                    "pack_type": "软盒",
                    "value": 50
                }
            ],
            "taste": [
                {
                    "taste": "烤烟型",
                    "value": 34
                },
                {
                    "taste": "雪茄型",
                    "value": 33
                },
                {
                    "taste": "薄荷型",
                    "value": 33
                }
            ]
        }
    },
    "msg": "操作成功！"
}
```

### POST /sales_data_predictions/

请求:

````
{
    "brand": "中华",
    "pack_type": "硬盒",
    "diameter": "粗支",
    "taste": "烤烟型",
    "region": "华北地区"
}
````

响应:

```
{
    "code": 0,
    "data": [
        {
            "date": "2024-01",
            "sales": 41318
        },
        ...
        {
            "date": "2024-12",
            "sales": 40731
        },
        {
            "date": "2025-01 (预测)",
            "lastet": "true",
            "sales": 50823
        },
        ...
        {
            "date": "2025-12 (预测)",
            "lastet": "true",
            "sales": 36098
        }
    ],
    "msg": "操作成功！"
}
```

### GET /activity

响应:

```
{
    "code": 0,
    "data": [
        {
            "activity_cost": 40618,
            "activity_date": "2024-01-01 至 2024-01-03",
            "activity_name": "元旦促销",
            "key": 1,
            "new_customers": 75,
            "participants": 475,
            "roi": "380.54",
            "sales_amount": 195186
        },
        ...
        {
            "activity_cost": 15017,
            "activity_date": "2024-02-10 至 2024-02-10",
            "activity_name": "会员日促销",
            "key": 7,
            "new_customers": 68,
            "participants": 199,
            "roi": "810.44",
            "sales_amount": 136721
        }
    ],
    "msg": "操作成功！"
}
```

### GET /activity/roi

响应:

```
{
    "code": 0,
    "data": [
        {
            "id": "acticity",
            "values": [
                {
                    "type": "实际投入成本",
                    "x": "元旦促销",
                    "y": 40618
                },
                ...
                {
                    "type": "总销售额",
                    "x": "会员日促销",
                    "y": 136721
                }
            ]
        },
        {
            "id": "ROI",
            "values": [
                {
                    "type": "ROI",
                    "x": "元旦促销",
                    "y": "380.54"
                },
                ...
                {
                    "type": "ROI",
                    "x": "会员日促销",
                    "y": "810.44"
                }
            ]
        }
    ],
    "msg": "操作成功！"
}
```

### GET /activity/card_data

响应:

```
{
    "code": 0,
    "data": [
        224228,
        1058160,
        459.08,
        385
    ],
    "msg": "操作成功！"
}
```

### POST /users/login

请求:

```
{
    "username": "123",
    "password": "123"
}
```

响应:

```
{
    "code": 0,
    "data": "false",
    "msg": "操作成功！"
}
```

