import json

# Danh sách các thẻ HTML5 và thuộc tính của chúng
html5_tags = {
    "a": ["href", "target", "download", "rel", "type", "hreflang"],
    "abbr": [],
    "address": [],
    "area": ["alt", "coords", "shape", "href", "target", "download", "rel"],
    "article": [],
    "aside": [],
    "audio": ["src", "controls", "autoplay", "loop", "muted", "preload"],
    "b": [],
    "base": ["href", "target"],
    "bdi": [],
    "bdo": ["dir"],
    "blockquote": ["cite"],
    "body": [],
    "br": [],
    "button": ["type", "disabled", "name", "value"],
    "canvas": ["width", "height"],
    "caption": [],
    "cite": [],
    "code": [],
    "col": ["span"],
    "colgroup": ["span"],
    "data": ["value"],
    "datalist": [],
    "dd": [],
    "del": ["cite", "datetime"],
    "details": ["open"],
    "dfn": [],
    "dialog": ["open"],
    "div": [],
    "dl": [],
    "dt": [],
    "em": [],
    "embed": ["src", "type", "width", "height"],
    "fieldset": ["disabled", "form", "name"],
    "figcaption": [],
    "figure": [],
    "footer": [],
    "form": ["action", "method", "enctype", "novalidate", "target", "name"],
    "h1": [],
    "h2": [],
    "h3": [],
    "h4": [],
    "h5": [],
    "h6": [],
    "head": [],
    "header": [],
    "hgroup": [],
    "hr": [],
    "html": ["lang", "dir"],
    "i": [],
    "iframe": ["src", "name", "width", "height", "allow", "allowfullscreen"],
    "img": ["src", "alt", "width", "height", "loading", "decoding"],
    "input": [
        "type", "name", "value", "placeholder", "required", "disabled", "readonly",
        "maxlength", "minlength", "checked", "min", "max", "step", "multiple", "pattern"
    ],
    "ins": ["cite", "datetime"],
    "kbd": [],
    "label": ["for"],
    "legend": [],
    "li": ["value"],
    "link": ["rel", "href", "type", "sizes", "media"],
    "main": [],
    "map": ["name"],
    "mark": [],
    "meta": ["name", "content", "charset", "http-equiv"],
    "meter": ["value", "min", "max", "low", "high", "optimum"],
    "nav": [],
    "noscript": [],
    "object": ["data", "type", "name", "usemap", "width", "height"],
    "ol": ["reversed", "start", "type"],
    "optgroup": ["label", "disabled"],
    "option": ["value", "label", "selected", "disabled"],
    "output": ["for", "name"],
    "p": [],
    "picture": [],
    "pre": [],
    "progress": ["value", "max"],
    "q": ["cite"],
    "rp": [],
    "rt": [],
    "ruby": [],
    "s": [],
    "samp": [],
    "script": ["src", "type", "async", "defer", "crossorigin", "integrity"],
    "section": [],
    "select": ["name", "multiple", "required", "size", "disabled"],
    "small": [],
    "source": ["src", "type", "media"],
    "span": [],
    "strong": [],
    "style": ["type", "media"],
    "sub": [],
    "summary": [],
    "sup": [],
    "svg": ["width", "height", "viewBox", "xmlns"],
    "table": ["border"],
    "tbody": [],
    "td": ["colspan", "rowspan", "headers"],
    "template": [],
    "textarea": ["name", "rows", "cols", "placeholder", "required", "disabled", "readonly", "maxlength"],
    "tfoot": [],
    "th": ["colspan", "rowspan", "headers", "scope"],
    "thead": [],
    "time": ["datetime"],
    "title": [],
    "tr": [],
    "track": ["kind", "src", "srclang", "label", "default"],
    "u": [],
    "ul": [],
    "var": [],
    "video": ["src", "controls", "autoplay", "loop", "muted", "poster", "width", "height", "preload"],
    "wbr": []
}

# Tổng hợp tất cả thuộc tính vào một mảng duy nhất
all_attributes = sorted({attr for attrs in html5_tags.values() for attr in attrs})

# Tạo JSON object với định dạng yêu cầu
result = {
    "allAttr": all_attributes
}

# Thêm các thẻ và thuộc tính đặc trưng của từng thẻ (loại bỏ thuộc tính trong allAttr)
for tag, attrs in html5_tags.items():
    unique_attrs = [attr for attr in attrs if attr not in all_attributes]
    result[tag] = unique_attrs

# Lưu vào tệp JSON
file_path = "/mnt/data/html5_tags_and_attributes.json"
with open(file_path, "w", encoding="utf-8") as file:
    json.dump(result, file, ensure_ascii=False, indent=4)

file_path


# Danh sách các thuộc tính toàn cục (Global Attributes)
global_attributes = [
    "accesskey",
    "autocapitalize",
    "class",
    "contenteditable",
    "data-*",
    "dir",
    "draggable",
    "enterkeyhint",
    "hidden",
    "id",
    "inputmode",
    "is",
    "lang",
    "part",
    "slot",
    "spellcheck",
    "style",
    "tabindex",
    "title",
    "translate"
]

# Lưu danh sách vào tệp JSON
global_attributes_path = "/mnt/data/global_attributes.json"
with open(global_attributes_path, "w", encoding="utf-8") as file:
    json.dump(global_attributes, file, ensure_ascii=False, indent=4)

global_attributes_path