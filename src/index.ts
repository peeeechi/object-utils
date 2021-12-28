
export type AccessorValuePair = {
  accessor: (string|number)[],
  value: any
}

export default class ObjectUtils {

  // constructor(obj: ({[key: string]: any} | {[key: string]: any}[]), separator: string = '.') {
  //   const dict = ObjectUtils.toFlatDict(obj, separator);

  //   this._obj = Object.assign({}, dict);
  // }

  // public getKeys(): string[] {
  //   return Object.keys(this._obj);
  // }
  
  
  // public getValue(key: string) : any | undefined {
  //   return this._obj[key]? this._obj[key].value : undefined;
  // }

  // public getAccessor(key: string) : (string | number)[] | undefined {
  //   return this._obj[key]? this._obj[key].accessor: undefined;
  // }

  // private _obj: {[key: string]: AccessorValuePair};

  public static TypeStrings: { [key: string]: TypeString } = {
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

  public static primitiveTypes: TypeString[] = [
    '[object Number]',
    '[object String]',
    '[object Boolean]',
    '[object Date]',
    '[object Null]',
    '[object Undefined]',
  ];

  public static objectTypes: TypeString[] = [
    '[object Array]',
    '[object Object]',
    '[object Function]',
  ];

  public static isPrimitive(item: any): boolean {
    return ObjectUtils.primitiveTypes.includes(ObjectUtils.getTypeName(item));
  }

  public static getTypeName(item: any): TypeString {
    return Object.prototype.toString.call(item) as TypeString;
  }

  public static hasChildren(obj: any) {
    return [
      ObjectUtils.TypeStrings.object,
      ObjectUtils.TypeStrings.array,
    ].includes(ObjectUtils.getTypeName(obj));
  }

  public static isMatchType(obj: any, targetTypes?: TypeString[]): boolean {
    return targetTypes
      ? targetTypes.includes(ObjectUtils.getTypeName(obj))
      : true;
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
            dict[parent_list.join(separator)] = {
              accessor: parent_list,
              value: element,
            } as AccessorValuePair;
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
          dict[parent_list.join(separator)] = {
            accessor: parent_list,
            value: element,
          } as AccessorValuePair;
        } else {
          ObjectUtils._toFlatDict(element, separator, dict, parent_list);
        }
      }
    }

    return dict;
  }

  public static toFlatDict(obj: any, separator: string = '.'): {[key: string]: AccessorValuePair} {
    return ObjectUtils._toFlatDict(obj, separator);
  }

  // static getValue(arr: (number | string)[], target: any): any {
  //   let v = target;
  //   for (let i = 0; i < arr.length; i++) {
  //     v = v[arr[i]];
  //   }
  //   return v;
  // }
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
