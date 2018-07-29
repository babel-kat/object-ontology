import os
import json
import sys
import re
import unicodedata


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def tagsToDict(tags):
    tagsDict = []
    counter = 0
    for tag in reversed(tags):
        tagsDict = {tag: [tagsDict]} if counter != 0 else {tag: []}
        counter += 1
    return tagsDict


def slugify(value, allow_unicode=False):
    """
    Convert to ASCII if 'allow_unicode' is False. Convert spaces to hyphens.
    Remove characters that aren't alphanumerics, underscores, or hyphens.
    Convert to lowercase. Also strip leading and trailing whitespace.
    """
    value = str(value)
    if allow_unicode:
        value = unicodedata.normalize('NFKC', value)
    else:
        value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)


def renameFiles(base):
    for root, dirs, files in os.walk(base):
        for file in files:
            if('DS_Store' not in file):
                src = root + "/" + file
                dest = root + "/" + slugify(file[:-4]) + file[-4:]
                os.rename(src, dest)


def constructFile(file, dir, obj):
    tags = dir.split('/')
    if(file in obj):
        obj[file]['tags'].update(tags)
    else:
        filePath = dir + "/" + file
        year = int(file[5:9]) if file[5:9].isnumeric() else 2018
        obj[file] = {
            "year": year,
            "file": filePath,
            "title": file,
            "tags": set(tags)
        }


def constructFilter(dir):
    d = {}
    key = os.path.basename(dir)
    if os.path.isdir(dir):
        d[key] = {
            'title': key,
            'desc': '',
            'children': []
        }
        d[key]['children'] = [constructFilter(os.path.join(dir, subDir)) for subDir in os.listdir(dir) if os.path.isdir(os.path.join(dir, subDir))]
    return d


def main():
    base = sys.argv[1]

    renameFiles(base)

    response = {
        'filters': [],
        'chairs': []
    }

    chairs = {}

    for root, dirs, files in os.walk(base):
        curDir = root[len(base) + 1:]
        # print("Current dir: " + curDir)
        for file in files:
            if(file.startswith('.')):
                continue
            # print("Current file: " + file)
            constructFile(file, curDir, chairs)
            # chairs[file].update(tagsToDict(tags))

    for key, value in chairs.items():
        response['chairs'].append(value)

    response['filters'] = constructFilter(base)[base[2:]]['children']

    with open('chairs.json', 'w') as outfile:
        json.dump(response, outfile, indent=4, cls=SetEncoder)


if __name__ == '__main__':
    main()
