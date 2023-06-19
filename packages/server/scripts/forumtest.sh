====================  1. add Message Reply test ===================================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla1", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply1", "messageId" : "1"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "1"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "2"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool

================= 2. add delete Section test ============================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl localhost:3001/forum/getallsections | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection
curl localhost:3001/forum/getallsections | python3 -m json.tool

================= 3. add delete Topic test ============================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletetopic
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool

================= 4. add delete Section and Topic test ============================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool
curl localhost:3001/forum/getallsections | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool
curl localhost:3001/forum/getallsections | python3 -m json.tool

============================== 5. Delete message ========================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletemessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool

===============================6. Update message ========================
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111",  "messagetext" : "qweqweqweqwqew", "id" : "1"}' localhost:3001/forum/updatemessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool

============================== 7. Cascade deleting Message and Reply
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla1", "topicId" : "1"}' localhost:3001/forum/addmessage
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply1", "messageId" : "1"}' localhost:3001/forum/addreply
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "1"}' localhost:3001/forum/addreply
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "2"}' localhost:3001/forum/addreply
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection

