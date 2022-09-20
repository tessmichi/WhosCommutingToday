# API


## Temporary deployment link

https://whoscommutingtoday.azurewebsites.net/


## Usable paths

<table>

<tr>
<th> Path </th>
<th> Description </th>
<th> Body </th>
<th> Obs </th>
</tr>

<tr><td>

/api/func-get-dates

</td><td>

Given a date, get all users intending to come in on that day

</td><td>

``` javascript
{
  "date": "2022-09-23"
}
```
</td></tr>


<tr><td>

/api/func-get-users

</td><td>

Given a date, get all users intending to come in on that day

</td><td>

``` javascript
{
  "name": "Robert"
}
```

</td></tr>


<tr><td>

/api/func-save-date

</td><td>

Given a user, record their choice to come in on that day

</td><td>

``` javascript
{
    "document": {
        "name": "Robert",
        "startDate": "2022-09-22",
        "endDate": "2022-09-24"
    }
}
```

</td><td>

startDate & endDate are **inclusive**

</td></tr>

</table>

## Internal

**func-clear-items** runs each night and clears all entries for which the endDate is smaller than the current date as it makes no sense to keep those.

## Recommended VSCode extension

[Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

## Other useful link and tutorials

https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript

https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript