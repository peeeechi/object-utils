export default class ObjectUtils {
  static TypeStrings: { [key: string]: TypeString } = {
    number: '[object Number]',
    string: '[object String]',
    boolean: '[object Boolean]',
    date: '[object Date]',
    function: '[object Function]',
    object: '[object Object]',
    array: '[object Array]',
    null: '[object Null]',
    undefined: '[object Undefined]',
  };

  static primitiveTypes: TypeString[] = [
    '[object Number]',
    '[object String]',
    '[object Boolean]',
    '[object Date]',
    '[object Null]',
    '[object Undefined]',
  ];

  static objectTypes: TypeString[] = [
    '[object Array]',
    '[object Object]',
    '[object Function]',
  ];

  static isPrimitive(item: any): boolean {
    return ObjectUtils.primitiveTypes.includes(ObjectUtils.getTypeName(item));
  }

  static getTypeName(item: any): TypeString {
    return Object.prototype.toString.call(item) as TypeString;
  }

  static hasChildren(obj: any) {
    return [
      ObjectUtils.TypeStrings.object,
      ObjectUtils.TypeStrings.array,
    ].includes(ObjectUtils.getTypeName(obj));
  }

  static isMatchType(obj: any, targetTypes?: TypeString[]): boolean {
    return targetTypes
      ? targetTypes.includes(ObjectUtils.getTypeName(obj))
      : true;
  }

  private static _getPrimitiveKeys(
    obj: any,
    keylist: Array<Array<string | number>> = [],
    parent: Array<string | number> = [],
  ) {
    if (ObjectUtils.getTypeName(obj) === ObjectUtils.TypeStrings.object) {
      for (const key in obj) {
        const parent_list: Array<string | number> = Array.from(parent);
        if (Object.hasOwnProperty.call(obj, key)) {
          parent_list.push(key);
          const element = obj[key];
          // if (hasChildren(element)) {
          if (ObjectUtils.isPrimitive(element)) {
            keylist.push(parent_list);
          } else {
            ObjectUtils._getPrimitiveKeys(element, keylist, parent_list);
          }
        }
      }
    } else if (ObjectUtils.getTypeName(obj) === ObjectUtils.TypeStrings.array) {
      for (let index = 0; index < obj.length; index++) {
        const parent_list: Array<string | number> = Array.from(parent);
        parent_list.push(index);
        const element = obj[index];
        // if (hasChildren(element)) {
        if (ObjectUtils.isPrimitive(element)) {
          keylist.push(parent_list);
        } else {
          ObjectUtils._getPrimitiveKeys(element, keylist, parent_list);
        }
      }
    }

    return keylist;
  }
  private static _toFlatDict(
    obj: any,
    separator: string = '.',
    dict: { [key: string]: any } = {},
    parent: Array<string | number> = [],
  ) {
    if (ObjectUtils.getTypeName(obj) === ObjectUtils.TypeStrings.object) {
      for (const key in obj) {
        const parent_list: Array<string | number> = Array.from(parent);
        if (Object.hasOwnProperty.call(obj, key)) {
          parent_list.push(key);
          const element = obj[key];
          // if (hasChildren(element)) {
          if (ObjectUtils.isPrimitive(element)) {
            dict[parent_list.join(separator)] = element;
          } else {
            ObjectUtils._toFlatDict(element, separator, dict, parent_list);
          }
        }
      }
    } else if (ObjectUtils.getTypeName(obj) === ObjectUtils.TypeStrings.array) {
      for (let index = 0; index < obj.length; index++) {
        const parent_list: Array<string | number> = Array.from(parent);
        parent_list.push(index);
        const element = obj[index];
        // if (hasChildren(element)) {
        if (ObjectUtils.isPrimitive(element)) {
          dict[parent_list.join(separator)] = element;
        } else {
          ObjectUtils._toFlatDict(element, separator, dict, parent_list);
        }
      }
    }

    return dict;
  }

  static toFlatDict(obj: any, separator: string = '.') {
    return ObjectUtils._toFlatDict(obj, separator);
  }

  static getPrimitiveKeys(obj: any) {
    return ObjectUtils._getPrimitiveKeys(obj);
  }

  static getValue(arr: (number | string)[], target: any): any {
    let v = target;
    for (let i = 0; i < arr.length; i++) {
      v = v[arr[i]];
    }
    return v;
  }
}

export type TypeString =
  | '[object Number]'
  | '[object String]'
  | '[object Boolean]'
  | '[object Date]'
  | '[object Function]'
  | '[object Array]'
  | '[object Object]'
  | '[object Null]'
  | '[object Undefined]';
