### Todo (G)

1. look at page source


## HTML

0. mark all finished/unfinished button  [X]

1. note template                        [X]
    * layout (div)                      [X]
    * checkbox                          [X]
    * textbox                           [X]
    * delete button                     [X]

2. bottom dashboard
    * layout                            [X]
    * items left counter                [X]
    * show all button                   [X]
    * show active button                [X]
    * show completed button             [X]
    * clear completed button            [X]

3. bottom fine print text               [X]


## CSS

1. new item box                         [X]
2. note template                        [X]
3. bottom dashboard                     [X]
4. fine print                           [X]
    
5. font design                          [X]
6. colors                               [X]
7. sizes                                [X]
8. shadow effect around content         [X]



9. ask kallin about responsive design, note edit box covering delete button


## JS


Note functionality
    * add new note                      [X]
    * delete note                       [X]
    * mark note as finished             [X]
    * clear input field when add new note [X]

Mark all complete button
    * make visible on add note          [X]
    * hide on no notes                  [X]
    * check/uncheck all notes           [X]

Dashboard functionality
    * items left counter                [X]
    * display all finished/unfinished/both [X]
    * clear completed functionality     [X]
    * hide clear completed on no checked [X]
    * hide dashboard on no notes        [X]
    
Problem/extras
    * paper stack effect (because it was easy) [X]
    * we have same id on every note/ id on template is note deleted
    * align the input text and mark all complete checkbox with notes under          [X]
    * mark all complete checkbox to change color when all checked/unchecked?
    * increase size of checkboxes



## tests
1. test adding of note (shows on page)
2. test items left counter (1 item left on check, 0 on uncheck)
3. test adding 3 notes, check one, assert "2 items left"

## extra

1. check that html is semantic


### Todo (VG)

1. notes should be editable
2. url management (dashboard buttons change url, make sure back and reload buttons work with this)
3. use localStorage to save notes across page reloads (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
4. write at least 3 more tests