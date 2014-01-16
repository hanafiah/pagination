<?php

$desc = array(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit scelerisque enim nec rutrum. Sed semper velit erat, in varius purus pretium ut. Cras sollicitudin, sem nec faucibus venenatis, sapien augue facilisis urna, dictum ornare massa diam eu lorem. Nam id dui facilisis, semper lectus a, commodo augue. Fusce et porttitor eros. Fusce aliquam venenatis dolor, at tincidunt tellus. Maecenas suscipit erat orci, vel bibendum leo dictum dapibus. Sed fermentum volutpat velit, vitae tempor elit tempor pharetra.',
    'Curabitur molestie sollicitudin ligula, ac laoreet velit ornare vitae. Donec semper sollicitudin dui ut mollis. Aenean blandit tellus ut lacus porttitor, eu accumsan arcu auctor. Proin nec nibh blandit, euismod lacus in, sollicitudin lectus. Nam auctor felis elementum sapien tincidunt imperdiet. Nulla sed elit sollicitudin, porta tellus vel, eleifend massa. Mauris eu lacus libero. Donec suscipit libero augue, sed laoreet arcu molestie id. In consectetur purus ut ante egestas, at mattis sapien vulputate. Quisque non convallis lectus, ac volutpat lacus. Nulla consectetur libero ac erat volutpat, ultricies ullamcorper metus vehicula. Cras a gravida orci.',
    'Suspendisse arcu mi, mattis vitae gravida et, luctus consectetur ipsum. Vivamus luctus, diam ac blandit porttitor, erat justo tempus ligula, id consequat leo mi ac lectus. Pellentesque aliquet ipsum vel felis varius vulputate. Etiam aliquet arcu a magna scelerisque, quis interdum nunc semper. Morbi aliquet pretium urna sed ornare. Sed velit risus, euismod egestas tincidunt a, dictum at tortor. Aenean euismod quam et eros posuere tempor. Phasellus eleifend elementum eros vitae ultrices. Quisque in sem ut neque vulputate viverra. In id leo imperdiet, varius ligula a, mattis massa. Suspendisse in consequat turpis.',
    'Duis tincidunt mollis vulputate. In adipiscing sed odio nec ultrices. Donec ac lacinia risus, sit amet semper tortor. Ut ultricies varius nulla, eu lacinia purus elementum nec. Curabitur sit amet leo ac arcu aliquam placerat. Curabitur viverra dictum ipsum ac molestie. Phasellus non neque dui. Aenean at eros vel orci sollicitudin rhoncus vel sit amet leo. Suspendisse sed arcu sed nunc pulvinar dapibus sit amet vel eros. Nam feugiat felis quis lacinia rhoncus.',
    'Aliquam ultricies urna vel fermentum molestie. Suspendisse ut condimentum erat. Proin tempus laoreet tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus sodales augue nulla, non ullamcorper felis sagittis ac. Nullam imperdiet ultricies neque, ut viverra ligula bibendum et. Nullam laoreet a justo ut lobortis. In rhoncus mollis elementum. Mauris gravida augue vitae nulla auctor, quis eleifend nisl adipiscing. Cras vulputate lobortis porttitor. Phasellus vehicula metus ut mauris facilisis bibendum. Aliquam et diam elementum metus gravida blandit ac sagittis velit. Donec non pellentesque sapien, nec vulputate mauris.'
);
$table = array();
for ($x = 1; $x <= 500; $x++) {
    $table[] = array(
        'id' => $x,
        'name' => 'my title ' . $x,
        'url' => 'http://example.com?x=' . $x,
        'desc' => $desc[$x % 4],
    );
}

$start = $_POST['offset'];
$limit = $_POST['limit'];

//cache data
//we only return some range of data
$data['data'] = array_slice($table, $start , $limit);

$data['total'] = count($table);
$data['start'] = (int) $start;
$data['limit'] = (int) $limit;

header("Expires: 0");
header("Cache-Control: no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");
header('Content-type: application/json');
echo json_encode($data);
