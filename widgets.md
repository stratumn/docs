# Widgets

# Introduction

In this technical document we present the different widgets being used across the Workflow Overview Table and Trace Info, its functionalities and configuration.

It is targeting developers and workflow administrators or integrators with a good knowledge of json data representation.

# Presentation

A Widget is a keyword we use to define an 'atomic' element of User Interface linked to some data. Its use is not restricted to tables, but tables configure and style them for their own purpose: a Table Cell is nothing more than a container for a widget, configured from the column definition and styled with borders and selection decorators…

It is a generic tool providing a context generated from the trace state. The goal is to provide a good level of insightful information to end users as to what has been done so far in the process. Each user might choose different information to be displayed, hence the need to build a configuration file following the same principles of the **[overview table configuration](https://docs.google.com/document/d/1yR0B1ZD97SvR5zM8ALTNIk2U8GoNA3HlkT49oj6LUug)**.

Example of widgets used in Trace Info that can be produced (right side panel):

![](https://lh3.googleusercontent.com/hfM49SRfrXC2QshFNj3sjrp8VvspHQPPEROak6CaNJdNwglN5n6_srMMER7Ik7QwhwcHT4Uuz1wRiK5eD3tBaCIUKOGZ6azMJVZxApyMywpiuWbWLifT83dq_h5xNBKeLU8xK_tUxr4Cko67p0zWSg ' =557x357')

Trace Info is built by interpreting a 'display configuration' document where we specify which data from the trace state should be read and how it should be displayed.

The configuration is similar to the overview table where we can integrate its widgets, views and wrappers.

# Configuration

Here is a sample snapshot of a json configuration structure:

```json
{
  "view": {
    "sections": [
      {
        "view": {
          "title": "status",
          "type": "window",
          "collapsable": true,
          "displayItemCount": false,
          "items": [
            {
              "view": {
                "key": "status",
                "type": "keyValue",
                "value": {
                  "view": {
                    "path": "data.status.step",
                    "type": "text"
                  }
                }
              }
            },
            …
          ]
       }
    ]
  }
}
```

# Views

A View is a keyword we use to define an atomic display of a piece of data. We provide core views which are fundamental to displaying correctly various natures of data.

All the views have the common property:

- **type**: the type of view to display. _String_

  \

Widget views can be configured on the [Trace Info](https://wiki.sia.partners/doc/trace-info-hLBrxtr4jX) and [Workflow Overview](https://wiki.sia.partners/doc/workflow-overview-table-RneRYuVYDB) configurations files.

## Activity 

The 'activity' view is a good first example of a 'packaged' view, ie a view that provides standard configurable display functionality that responds to a specific need, here being able to see in the same view who did something and when.



The configuration of the activity view is:

- **who**: configuration of the information to display on the first line, related to 'who' did something. _Object_:

- **who.path**: path to the name of the person or group that we want to display. _String_.
- **who.avatarPath**: if set, display the avatar of the person before the activity information. _String - Optional_.

- **when**: configuration of the information to display on the second line, related to 'when' it was done. _Object_:

- **when.path**: path to the date time of the activity we want to display. _String_.
- **when.showCountDown**: whether we want to display a countdown (eg '3 days ago') instead of a date. _Boolean - Default: false._
- **when.format**: If we display a date and not a countdown, how to format it. _String - Default: 'DD.MM.YY'._

Config json \n\n ![](attachments/229b19fd-0658-47b8-acb6-3fb10a4fe988.png ' =416x223')

Widget screenshot

## Array 

The 'array' view.

The configuration of the array view is:

- **keyPath**:  the key of the path to be displayed. _String_
- **itemsPath**: the path to the data to be displayed. _String_
- **itemsWidget**: it takes a view to display. _Object_
- **searchBar**: (ONLY WORKING ON COMMENTS FOR NOW) an object describing a search bar config on how to search within the items of the array. _Object_



Config json:

```json
"view": {
  "defaultSort": {
    "direction": "desc"
  },
  "itemsPath": "data.comments",
  "itemsWidget": {
    "view": {
      "type": "comment"
    }
  },
  "searchBar": {
    "placeholder": "Search in comments..."
  },
  "type": "array"
}
```

Widget screenshot

![](https://lh6.googleusercontent.com/ohKRoMZivZazvoCIP3RSc-uJgfMwdT6icuEnlEcVzhfIEpskLbnyT7JDXlAkNl-tqDwrBLkxMxQ8m-vs6pKtfxM-n7xF47oPrCswCaqMyRAEA5qpTkHLS2F2toYsXtZ9pwfFPx5ZdtsceE32_7DG9w ' =297x189')

\

## Avatar 

The 'avatar' view enables to display an avatar with a name on the right.

The configuration of the avatar view is:

- **path**: path to the name of the person or group that we want to display. _String_
- **avatarPath**: path to the avatar to display. _String_
- **isGroup**: whether we want to display an avatar designed for groups (hexagonal), instead of users (circle). _Boolean - Default: false - Optional._
- **useContext**: for groups only. Treat the data found at **path** as an id and ask trace to provide the current group name. _Boolean - Default: false - Optional._



Config json

![](attachments/42a10998-5f28-41ba-b698-8cd87153a1ea.png ' =582x122')

Widget screenshot

![](attachments/21e2bd2c-6f16-4b90-80d0-dc7adbb2815f.png ' =250x359')

## Boolean 

The 'boolean' view works like the 'icon' view but with a more straightforward configuration and less options. If the value of the path is truthy, a check mark will be displayed.

The configuration of the boolean view is:

- **path**: a path to a data value that has to be truthy to trigger the effective rendering of the check mark. Example : "path": "data.finalized"
- The path provided could be a JMESPath like "data.count > \`1\`" that would display the check mark as expected in the cell, but this type of configuration would not allow the column sorting to work since the backend would not recognise a JMESPath.
- Therefore the best way is to provide a real boolean field in each trace data.



Config json

![](attachments/c897203b-9c28-4ed6-a2ba-248ec03bf407.png ' =499x98')

Widget screenshot

![](attachments/3b3f81e6-c16d-48fb-9f46-46c2c4b1c7ef.png ' =166x318')

\

## Box

The 'box' view can encapsulate many different views.

It is easily configured:

- **sections**: an array of views used to display trace state data. _Array_

Config json

![](https://lh6.googleusercontent.com/d8nrdliucZFk1NjKSwoUJggPvlME6SkqeGmyR-u2GAse1YztVkbkvCL2cXBb00tVSd3IkrRwW4_97u-jzuVUybCxBJB4B-yVvLPGX9lPMSAEoZhGoijjrQiahM2MHB6_JqDCpwucE1-j9ZJJocLA6g ' =256x237')

Widget screenshot  ![](https://lh4.googleusercontent.com/fA8B-5hnxTFCCXdMMK_RHbKPiy1t1usZN2_W2tmz6vLmO-KTTljF3-9fh-V698q45TpFa98vhiDX1y88ChKhGw-d2EdyZGzoUKjkLJTzlXqNadrgnQFAunDqjxuez-hNixMr5d4_VAjxyDEMiO3Rjg ' =263x216')

## Code 

The 'code' view (mainly for Stratumn team for visualization / debugging) enables to display a data object using a code-friendly editor, namely **[CodeMirror](https://codemirror.net/)**:

- **path**: the path to the object to be displayed. _String_
- **codemirrorOptions: all the options for the codemirror editors as listed **[here](https://codemirror.net/doc/manual.html#config)**. Object - _Optional._**



Config json \n\n ![](attachments/f31da5ef-cb54-42c6-b111-632e02ee4101.png ' =416x68')

Widget screenshot

![](attachments/d28d2cec-e97a-49f3-b06b-7bec990463e0.png ' =166x265')

## Comment

The 'comment' view.

There is no configuration to add for the comment view.

## CommentFeed

The 'commentFeed' view.

Config json

- path: the actual path to the comment list. _String_

![](attachments/efaec274-73e8-4b29-ac12-92591de03e3d.png)

if you want to display the number of comment:\n`` "join('',[to_string(length(comments || '')), ' ', (length(comments || '') <= `1` && 'comment') ||'comments'])" ``

Widget screenshot

![](attachments/56066322-c6cf-486b-80a6-2436a8a5b7c1.png ' =151x248')

## DataTab

The 'dataTab' view enables the display of a summary from a saved Table. When clicked the Table will open in a modal.

The configuration of the dataTab view is:

- editedAtPath: the path to last modified date stamp. _String_
- editedByPath: the path to the user who modified the document last. _String_
- namePath: the path name for the document. _String_
- path: the actual path the document. _String_

  \

Config json

![](attachments/4587fca8-5f7d-4db7-adca-bd673dbbfd62.png ' =499x111')

Widget screenshot

![](attachments/9dea5fd0-371f-4c5b-8524-c85684ffbe98.png ' =582x67')

## Date 

The 'date' view enables to display a formatted date. It also handles a deadline warning feature, that enables to display as red text with a warning icon if the date is in the past (or too close to today).

The configuration of the date view is:

- **path**: the path to the date string. _String._
- **format**: the format to apply to the date when displaying. _String - Default: 'DD.MM.YY'._
- **isDeadline**: whether to add the deadline feature. _Boolean - Default: false._
- **deadlineWarningBuffer**: display warning if the date is closer to today than this number of days. Eg 5 means start warning 5 days before deadline*. Number - Default: 0.*
- **donePath**: a path to a value that removes the warning feature if it is truthy (eg when something is already flagged as 'Done'). _String - Optional._
- **deadlineWarningIcon**: an icon id to use in the warning.
- _Default: 'Clock'._



Config json

![](attachments/0e706f9d-1ff0-41b1-85c5-8df63b8b1e76.png ' =416x89')

Widget screenshot

![](attachments/bdfb2b20-c100-49de-a4ff-c76c2f5784b2.png ' =166x78')

## File

The 'file' view.

There is no configuration to add for the file view. \n

## File Compact 

The 'fileCompact' view enables to display a link to a downloadable file. An icon in front of the link is guessed from the file extension, defaulted to 'Download' icon.

The configuration of the fileCompact view is:

- **path**: path to the file information (standard structure provided by trace when uploading files: memtype, name, digest, key). _String._
- **defaultIcon**: overwrites the default icon to use if the file extension is not recognized. _String - Optional_.
- **editor**: **UploadFile**
- `editor.disabledPath`: adds a JMESPath condition to disable the update of the field.

  `` ex:"fileName == `file.txt`" ``. _String - Optional_.



Fais Config json

![](attachments/00bdfa5f-798b-466e-9dd3-62702907a429.png ' =499x89')

Widget screenshot \n\n ![](attachments/adb9d692-79ba-4016-9618-be10e32cf18a.png ' =333x131')

## HTML 

The 'html' view enables to display a piece of data as rendered HTML, which enables to render rich text that may be pushed in traces. To avoid xss type of attacks when displaying, the html value is sanitized first using dompurify. The 'sanitization' can be configured.

The configuration of the html view is:

- **path**: the path to the data to be displayed. _String._
- **default**: the default value to display if the data found at path is empty. _String - Optional._



Config json

![](attachments/0d96a881-5e63-4721-86b8-f224856a6e92.png ' =416x67')

## Icon 

The 'icon' view enables to display an icon either defined statically for all the rows or by reading a path and interpreting the string found as a DynamicIcon id (from the Icons library). It is also possible to display a (text) label next to it.

The configuration of the icon view is:

- **path**: a path to a data value that has to be truthy to trigger the effective rendering of the icon. _String -_ _Optional._
- **iconPath**: the path to a data field interpreted as an icon id. Renders 'Document' if the icon id is undefined or not recognized, or the icon defined in 'icon' (see below) if it is set. _String - Optional._
- **labelPath**: path to the label value. *String -* *Optional.*
- **icon**: an icon id to apply to all the rows. *String -* *Optional.*

When using this view, if none of **iconPath** or **icon** is set, but **path** yields a truthy value, a 'Document' icon will be displayed.



Config json

![](attachments/1ae51b12-8da8-4130-b436-0d6509f3c633.png ' =416x69')

Widget screenshot

![](attachments/6114c616-3631-40a1-8980-955675702222.png ' =250x155')

## KeyValue

The 'keyValue' view can display a piece of data using the overview table already existing views.

The configuration of the keyValue view is:

- **key**:  the visible label describing the pair. _String_
- **value**: it takes a view to display. _Object_

```javascript
{
  y;
}
```

Widget screenshot  ![](https://lh3.googleusercontent.com/pgZAlnNHuttljv3-jodAcfrst1vnad2tFSvFNCvCnoJkv2iVTNRHtS_ZrBb9sL4sIQCNd-GUSWt-FCBwxLrIhXv8uFsn-79hJXgwJRSjlrhpvLekjJwOWjlc0zVAMbIwFmrnPATtzzRd78xDU6c2_w ' =290x240')

## Labels

The 'labels' view enables to display a list of strings as a set of labels, and is very simply configured:

- **path**: the path to the list of labels to be displayed.\n

## Link

The _Link_ view enables to display a classical HTML link. It holds the same configuration data as the **[Link Wrapper](https://docs.google.com/document/d/1BCnGLQ5yv1IErevhn99mMQNOpk_4n5VO/edit#heading=h.3whwml4)**. Note that the difference is that the link wrapper can display any view, while making the cell clickable and behave like a link, while the link view is a classical link. Hence the wrapper is more 'powerful'.



![Config json](attachments/d6602a4c-6974-4462-8298-7c1a1e36315a.png ' =416x105')\n\n ![Widget screenshot](attachments/590098a5-89b4-4aa9-989d-9f7887a8b3dc.png ' =499x63')

##

## List 

The _List_ view enables to display a list of strings as a (trace-)standard formatted list. This uses the List component from Atomic library.

The configuration of the list view is:

- **path**: the path to the data to be displayed. _String._
- **ordered**: whether to display an ordered list (vs basic bullet points). _Boolean - Default: false._
- **small**: whether to use a smaller (standard) font size. _Boolean - Default: false._
- **light**: whether to use a lighter (standard) font color. _Boolean - Default: false._



![Config json](attachments/49970dc2-d5db-4e99-bd46-d1690077975e.png ' =582x91')

![Widget screenshot](attachments/aa44d6e3-7f48-48e8-a2bc-39fbce32fdad.png ' =333x100')

## List Compact 

The List Compact view enables to display a simple list of string-like values in a small cell, by showing only "n items" in the cell, plus a tool-tip on hover with all the elements. If only one element is in the list or if it points at a non array data, this single element is displayed (stringified) in the cell. It is also possible to customize the item name, _eg_ to display _n documents_ instead of _n items_.

The configuration of the List Compact view is:

- **path**: path to the array of data. If non array data is found an array with this single element is used. If only one element is found in the array it is displayed normally in the view. _String._
- `ordered`: display numbers in the list content (tool-tip) instead of bullet points. _Boolean_ -_Optional_.
- `itemName`: customize item name, eg "document" displays "n documents" instead of "n items". _String._



Config json

Widget screenshot

## Prose 

The 'prose' view enables to display a piece of data as a (trace-)standard formatted paragraph. This uses the Prose component from Atomic library.

The configuration of the prose view is:

- **path**: the path to the data to be displayed. _String._
- **small**: whether to use a smaller (standard) font size. _Boolean - Default: false._
- **light**: whether to use a lighter (standard) font color. _Boolean - Default: false._

\n ![Config json](attachments/858285f3-2182-4e3c-be4c-fa74873e11be.png ' =416x101')

![Widget screenshot](attachments/dce148cc-0981-448a-98f8-82c8ae5914cb.png ' =333x198')

## Table

The _table_ view allows the display of Table component.

The configuration of the table view is:

- `config`: the table configuration: _Object_
- `config.allowColumnsSelection`: whether the 'customize layout' option is available or not in the table header. _Boolean_
- `config.columns`: the list of each column. _Array_

  Each column is configured like this:

  - `header`: the title of the column. _String._
  - `key`: the data key fro the column. _String._
  - `width`: sets the columns width. _String._
  - `cell`: sets the view of the cells of the column. _Object_

    ![](attachments/313d7494-03a1-4fb2-82f7-426adec14323.png ' =333x121')

- `config.dataSelectorPath`: the path to the data selector key. _String_
- `config.minColumnsWidth`: sets the columns minimum width:

  `xsmall`, `small`, `medium`, `large` or `xlarge`. _String_

- `config.minRowsHeight`: sets the rows minimum height ._Number_
- `config.selectBoxWidth`: sets the first column width. _Number_
- `config.showEmptyTable`: seems deprecated. _Boolean_
- `config.tableWidthBuffer`: seems deprecated. _Number_
- `height`: defines the height of the table. Default "75vh" - _String_
- `path`: path the table data. _String_

Example:

![Config json](attachments/8cf7f30b-7cf1-48ad-a731-379868792ed6.png ' =582x282')

![Widget screenshot](attachments/70688af3-6b01-4349-a233-476dc84209f6.png ' =666x171')



Note that the view 'default' parameter behavior could be replicated using [JMESPath](https://jmespath.org/)'s embedded 'default' feature, so that:

- **path** = "traceName" with **default** = "Some default text"
- is equivalent to **path** =` " traceName || 'Some default text' "`

Also note that using the [JMESPath](https://jmespath.org/)'s powerful 'join' feature, it is possible to build complex strings with nested state data, for example:

- **path** = `"['Hello ',userName,', how are you?'].join('',@)"`
- will effectively produce: `"Hello ${userName}, how are you?"`



![Config json](attachments/a649dd42-ce68-4d24-aef8-9aada196b9f4.png ' =499x103')

![Widget screenshot](attachments/2163c520-c377-4faa-a7c9-fba2f3a510a8.png ' =333x192')

\

## Window

The _window_ can encapsulate many different views. The difference with the box view lies in its additional configuration.

The configuration of the window view is:

- **title**:  the visible text describing the window. _String_
- **collapsable**: whether to enable the window to be collapsable. _Boolean_
- **displayItemCount**: whether to display the items count present in the window. _Boolean_

![Config json](https://lh4.googleusercontent.com/neXcXo7RrDF3UG3MVT-jW0qS2IqjrCLX0a1HxI8-aY0PfpLIY4wzGhRxqgDV5z9KmZ0Dk0FJvyMQ7YoMy7mCVL7WfZq5TcGnxFRLwhMlh3WsbXtD8RY8_0PCMPHXHziPNkGt67A5k2OvoOPBV7di4Q ' =274x220')

![Widget screenshot](https://lh3.googleusercontent.com/rRv5pUH1WqwemynWhtIHVuPW96fS37QIPLBsf6UhNGeqm8mr71MLP101T0hDOCYRAwQz3_4bIY8zeyfli6dxk2chzY0XFTXN1i5K1B2sqsQi2F7q8koGLTP5C-9ujt2blPU_jd7Za-xpV-f2DwSlaw ' =272x225')

\

## Trace Info configuration from Trace-UI

If the user is logged in as a superuser, a 'Config' icon appears on the top right of the trace inspector,  enabling him or her to modify the trace info configuration in a JSON editor and save it back to the server. Changes will appear immediately in the trace inspector and on all the users' currently viewing the Trace Info of this trace.

![](https://lh4.googleusercontent.com/TTrexFCUPfnRkrF_Q5Q2OxQKeszNJC1__PaTYkQT0z0Zv2ube75avm-ZK3JPLJmA0jl7gnK1JvbUr8yskEemWk6A0XeJUq4BcDM8GYaGg2hpJLuGmUysK7xctxH0L8B2s0LrtKvVfCkyo2pKvFp11w ' =624x340')

\n

If the modified JSON string is invalid (ie badly written) a warning will appear below the modal, preventing from closing and sending a bad string to the server.

# Editors

When used inside a data editor table, the cell can have an `editor` option to determine how the content of the cell can be edited.

## Text

Text widget has multiple editor types:

### `input`**: a simple text input**

### `number`**: a simple number input**

### `select`**: a select input allowing to chose on value from a defined list**

:::info
Todo: Complete to describe config and options

:::

### `comment`**: a multi-line text field allowing to enter long texts**

_Config:_

```json
"view": {
  "editor": {
    "type": "comment"
  },
  "path": "document",
  "type": "text"
}
```

![Result when editing](attachments/53f0d8f4-678a-4f16-9ba4-27bee9f9956b.png)

![Result when viewing changes](attachments/af06d724-f8cb-49dd-aec7-7e6f4cdebfbc.png)

### **Multi select: a multiple select input allowing to chose multiple value from a defined list**

:::info
Todo: Complete to describe config and options

:::

### **Date: a date picker field**

:::info
Todo: Complete to describe config and options

:::

## [File Compact](https://wiki.sia.partners/doc/widgets-uXV0BWN32Q#h-file-compact)

When dealing with files, the _File Compact_ widget can be used with an `uploadFile` editor to [upload a file](/doc/media-sdk-tWDGz6215K) from a table cell.

Config:

```json
"view": {
  "editor": {
    "type": "uploadFile"
  },
  "path": "document",
  "type": "fileCompact"
}
```

At the click the file explorer open, only one file can be selected.

![](attachments/13fa6809-fb5f-4bd6-8aba-360b7980121e.png)

Once the file is selected, the file appears like this:

![](attachments/06b046a9-6a16-45a9-aadd-69fd6db64916.png)

Using the tools, we can: replace, download or delete the file.

Once confirmed, it is only possible to download the file

![](attachments/689a7c8a-5b0d-4142-a8f8-5f270e6674d1.png)

## [CommentFeed](https://wiki.sia.partners/doc/widgets-uXV0BWN32Q#h-commentfeed)

CommentFeed has an editor to manage adding comments:

### `addComment`**: a rich text to add comment**

You can add, edit & remove comment

_Config:_

```javascript
"view": {
  "editor": {
    "type": "comment"
  },
  "path": "document",
  "type": "text"
}
```

![](attachments/066d65d8-6ae9-4042-b9f0-f36318bd4d66.png ' =501x551')

![](attachments/f636648f-1411-4ce3-8bf9-ff21b5d6390e.png ' =492x827')

# Wrappers

Common property applicable to any wrapper:

- `conditionPath`: JMESPath condition to conditionnaly.
  - If provided, the wrapper will be applied only if the path is not evaluated as false.
  - If this key is not provided, the wrapper will be applied in any case.

## Link 

The widget becomes clickable and routes to a custom url.

The Link wrapper configuration is:

- **rootUrl**: a url prefix applied to the widget. _String - Default: ""._
- **urlPath**: the path in each data to the url suffix. _String._
- **openInNewTab**: whether to go to the built url from a new tab or in the current one. _Boolean_ - _Default: true._

The global url is built from `rootUrl` + `data[urlPath]`.

Note that using the [JMESPath](https://jmespath.org/)'s powerful _join_ feature, it is possible to build complex urls where state data is nested within the string, for example:

- ` rootUrl = "``__https://trace.stratumn.com/outerPath/__``"  `
- `urlPath = "[rowId,'innerPath'].join(/,@)" `

Will effectively link to url: "**[https://trace.stratumn.com/outerPath/${data\[rowId\]}/innerPath](https://trace.stratumn.com/workflow/)**".

![ Config json](attachments/d6602a4c-6974-4462-8298-7c1a1e36315a.png ' =416x105')

![Widget screenshot](attachments/590098a5-89b4-4aa9-989d-9f7887a8b3dc.png ' =499x63')

## Modal

The widget becomes clickable and opens a 'modal' (a small window showing on top of the current page) showing additional pieces of data.

The Modal wrapper configuration is:

- **title**: the title of the modal. Can be a simple string or a full widget configuration.
- **body**: the (scrollable) content of the modal, defined as a full widget configuration.
- `large`: if true the modal has a higher width (`800px`), especially useful when the modal content displays a lot of structured information (like a 'code' View) or even interaction.

This window needs to be manually closed by either clicking on the 'Close' button or outside the window.

_Example:_

```json
{
  "title": { "view": { "path": "[traceId,' Trace State'].join('',@)" } },
  "body": { "view": { "type": "code", "path": "" } },
  "large": true
}
```

This will produce a large modal with title `'${traceId} Trace State'` and content being the full trace state viewed as json.

## Tool-tip 

The widget becomes hoverable and a small 'tool-tip' window is displayed next to it to provide additional information. It is possible to specify where the tool-tip will appear with respect to the widget.

This tool-tip disappears when the mouse leaves the widget.



The Tool-tip wrapper configuration is:

- `title`:  the title of the tool-tip. Can be a simple string or a full widget configuration. _Optional._
- `visiblePath`: a condition based on a [JMESPath](https://jmespath.org/)
- `body`: the content of the tool-tip. Can be a simple string or a full widget configuration.
- `delay`: the time in milliseconds before displaying the tool-tip, once entering the widget. _Default: 0._
- `withArrow`: flag indicating whether an arrow should be added on the tool-tip border facing the widget. The arrow is always placed in the middle of the intersection area of the widget and tool-tip. _Default: true._
- `position`: the position of the tool-tip wrt to the widget:
  - `place`: 'below', 'above', 'right', 'left'. Where to place the tool-tip wrt to the widget. _Default: 'below'._
  - `placeShift`: a signed shift in pixels in the 'place' direction. So 5 with 'below' place would mean `5px` below the widget, whereas -5 would mean 5 pixel above the bottom border of the widget (hence a partial 'merge' effect of the widget and the tooltip). _Default: 0._
  - `adjustPlace`: whether to adjust the place of the tool-tip. If there's not enough space in the place direction to display the content in full, it is moved to the opposite place (above <-> below, left <-> right) only if there is more space there. _Default: false._
  - `anchor`: 'center', 'left', 'right', 'top', 'bottom'. Specifies the behavior in the cross axis (orthogonal to the 'place' axis). _Default: 'center'._
  - `anchorShift`: a signed shift in the 'anchor' direction. _Default:_ `0`_._
  - `adjustAnchor`: whether to adjust the cross axis positioning of the tool-tip. If there's not enough room in the anchor direction to display the content in full, it is moved from the anchor point until the cross axis size is displayed fully. _Default:_ `false`_._

Below are some examples of tool-tip configuration:

- vertical placement, horizontal anchorage
- horizontal placement, vertical anchorage
- placeShift and anchorShift:
- merging the widget and tool-tip using placeShift and anchorShift:

\
Note: by default the tool-tip arrow is 'touching' the widget, which enables the user to navigate from the widget content into the tool-tip content, hence enabling tool-tip text selection or even action… If you wish to disable this behavior you may add a positive placeShift.

Whatever the position setup, if part of the tool-tip is hidden it remains scrollable as a whole so the user has effectively access to all the data.

Any set of wrappers can wrap any widget, thus producing a very flexible configuration of the UI.
