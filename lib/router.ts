const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

interface Route {
  path: string;
  regex: RegExp;
  callback: (params: (string | null)[]) => void;
}

export class Router {
  private routes: Route[];

  constructor() {
    this.routes = [];
  }

  exec(path: string) {
    for (const route of this.routes) {
      const isMatch = route.regex.test(path);

      if (isMatch) {
        const params = this.extractParameters(route.regex, path);
        route.callback(params);
        break;
      }
    }
  }

  add(segment: string, callback: (params: (string | null)[]) => void) {
    const regex = this.routeToRegExp(segment);

    this.routes.push({ path: segment, regex, callback });
  }

  /**
   * Convert a route string into a regular expression, suitable for matching.
   */
  routeToRegExp(route: string): RegExp {
    route = route
      .replace(escapeRegExp, "\\$&")
      .replace(optionalParam, "(?:$1)?")
      .replace(namedParam, function (match, optional) {
        return optional ? match : "([^/?]+)";
      })
      .replace(splatParam, "([^?]*?)");
    return new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$");
  }

  /**
   * Given a route, and a URL fragment that it matches, return the array of
   * extracted decoded parameters. Empty or unmatched parameters will be treated as `null`
   * to normalize cross-browser behavior.
   */
  extractParameters(route: RegExp, fragment: string): Array<string | null> {
    const result = route.exec(fragment);
    if (!result) return [];

    // Removes the first item from the result array because its the input text executed by the regex.
    const params = result.slice(1);

    return params.map((param, i) => {
      // Don't decode the search params.
      if (i === params.length - 1) return param || null;
      return param ? decodeURIComponent(param) : null;
    });
  }
}
