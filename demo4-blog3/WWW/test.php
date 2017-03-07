<?php
$contents= curl_get("http://www.5pai.com/i5549496", false);
$contents = strtolower( $contents);

preg_match_all( '/<h1\s+.*>(.*)</h1>/', $contents, $result);

print_r( $result);
?>