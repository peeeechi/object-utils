# object-utils

Convert nested objects to 2D objects


## usage

```ts

import noe from 'nested_objects_expander';

const obj = {
    number_prop: 7,
    string_prop: "test prop",
    date_prop: new Date(),
    boolean_prop: true,
    array_prop: [1,2,3,4,5,6],
    object_prop: {
        nested_number_prop: 7,
        nested_string_prop: "test prop",
        nested_date_prop: new Date(),
        nested_boolean_prop: true,
        nested_array_prop: [1,2,3,4,5,6],
    },
    array_object_prop: [...Array(5).keys()].map(i => {
        return {
            num: i,
            createdAt: new Date,
        };
    }),
};

const flat = noe.toFlatDict(obj);

console.table(flat);

/*
=>
┌─────────────────────────────────┬───────────────────┐
│             (index)             │                 accessor                  │          value           │
├─────────────────────────────────┼───────────────────┤
│           number_prop           │             [ 'number_prop' ]             │            7             │
│           string_prop           │             [ 'string_prop' ]             │       'test prop'        │
│            date_prop            │              [ 'date_prop' ]              │ 2021-12-28T23:43:40.192Z │
│          boolean_prop           │            [ 'boolean_prop' ]             │           true           │
│          array_prop.0           │            [ 'array_prop', 0 ]            │            1             │
│          array_prop.1           │            [ 'array_prop', 1 ]            │            2             │
│          array_prop.2           │            [ 'array_prop', 2 ]            │            3             │
│          array_prop.3           │            [ 'array_prop', 3 ]            │            4             │
│          array_prop.4           │            [ 'array_prop', 4 ]            │            5             │
│          array_prop.5           │            [ 'array_prop', 5 ]            │            6             │
│ object_prop.nested_number_prop  │  [ 'object_prop', 'nested_number_prop' ]  │            7             │
│ object_prop.nested_string_prop  │  [ 'object_prop', 'nested_string_prop' ]  │       'test prop'        │
│  object_prop.nested_date_prop   │   [ 'object_prop', 'nested_date_prop' ]   │ 2021-12-28T23:43:40.192Z │
│ object_prop.nested_boolean_prop │ [ 'object_prop', 'nested_boolean_prop' ]  │           true           │
│ object_prop.nested_array_prop.0 │ [ 'object_prop', 'nested_array_prop', 0 ] │            1             │
│ object_prop.nested_array_prop.1 │ [ 'object_prop', 'nested_array_prop', 1 ] │            2             │
│ object_prop.nested_array_prop.2 │ [ 'object_prop', 'nested_array_prop', 2 ] │            3             │
│ object_prop.nested_array_prop.3 │ [ 'object_prop', 'nested_array_prop', 3 ] │            4             │
│ object_prop.nested_array_prop.4 │ [ 'object_prop', 'nested_array_prop', 4 ] │            5             │
│ object_prop.nested_array_prop.5 │ [ 'object_prop', 'nested_array_prop', 5 ] │            6             │
│     array_object_prop.0.num     │     [ 'array_object_prop', 0, 'num' ]     │            0             │
│  array_object_prop.0.createdAt  │  [ 'array_object_prop', 0, 'createdAt' ]  │ 2021-12-28T23:43:40.192Z │
│     array_object_prop.1.num     │     [ 'array_object_prop', 1, 'num' ]     │            1             │
│  array_object_prop.1.createdAt  │  [ 'array_object_prop', 1, 'createdAt' ]  │ 2021-12-28T23:43:40.192Z │
│     array_object_prop.2.num     │     [ 'array_object_prop', 2, 'num' ]     │            2             │
│  array_object_prop.2.createdAt  │  [ 'array_object_prop', 2, 'createdAt' ]  │ 2021-12-28T23:43:40.192Z │
│     array_object_prop.3.num     │     [ 'array_object_prop', 3, 'num' ]     │            3             │
│  array_object_prop.3.createdAt  │  [ 'array_object_prop', 3, 'createdAt' ]  │ 2021-12-28T23:43:40.192Z │
│     array_object_prop.4.num     │     [ 'array_object_prop', 4, 'num' ]     │            4             │
│  array_object_prop.4.createdAt  │  [ 'array_object_prop', 4, 'createdAt' ]  │ 2021-12-28T23:43:40.192Z │
└─────────────────────────────────┴───────────────────┘

 */

```
