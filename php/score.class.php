<?php

class Score {
    private $id;
    private $pseudo;
    private $score;

    function __construct()
    {
        $this->id = 0;
        $this->pseudo = "Wirefox Anonyme";
        $this->score = 0;
    }

    //met l'ensemble des scores dans l'objet courant
    function getAllFromDB ()
    {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $result = $pdo->query('SELECT * FROM Scores');

            $listeScores = array();
            $compteur = 0;

            while ($objet = $result->fetch(PDO::FETCH_OBJ)) {
                array_push($listeScores, $objet);
                $compteur++;

                //ne récupère que les 10 premiers scores
                if($compteur >= 10) {
                    break;
                }
            }

            $final = array("ok" => true, "message" => "requete reussie", "result" => $listeScores);

            $pdo = null;
        } catch (Exception $e) {
            $final = array("ok" => false, "message" => $e->getMessage(), "result" => null);
        }

        return json_encode($final);
    }

    //affichage
    function affiche() {
        print("hey");
        foreach($this as $this) {
            print ($this->id." ".$this->pseudo." ".$this->score);
            print("coucou");
        }

    }

    //récupère données de get et les met dans l'objet
    function chargeGET () {
        $this->pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : "Wirefox Anonyme";
        $this->score	= isset($_GET['score']) ? $_GET['score'] : NULL ;
    }

    //envoie score dans BDD
    function insertDB () {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $requete = 'INSERT INTO Scores (pseudo, score)
								VALUES ("'.$this->pseudo.'","'.$this->score.'");';
            $pdo->exec($requete);
            $this->id = $pdo->lastInsertId();

            $pdo = null;
        } catch (Exception $e) {
            //si erreur dans le bloc précédent
            print("<p>Erreur : ".$e->getMessage()."</p>");
            exit;
        }
    }

    //vérifie que la BDD n'est pas trop remplie
    /*function checkDB () {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $nbrScores = $pdo->query("SELECT COUNT(*) FROM Scores;");
            $nbrScores = $nbrScores->fetch(PDO::FETCH_UNIQUE);

            if($nbrScores[0] >= 10) {
                return true;
            } else {
                return false;
            }

            $pdo = null;
        } catch (Exception $e) {
            //si erreur dans le bloc précédent
            print("<p>Erreur : ".$e->getMessage()."</p>");
            exit;
        }
    }*/

    //supprime la valeur la plus faible de la BDD
    /*function smallerDB () {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $pdo->exec("SELECT COUNT(*) FROM Scores;");


            $pdo = null;
        } catch (Exception $e) {
            //si erreur dans le bloc précédent
            print("<p>Erreur : ".$e->getMessage()."</p>");
            exit;
        }
    }*/

    //controleur
    function controleur () {
        $action	= isset($_GET['action']) ? $_GET['action'] : NULL ;
        $pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : "Wirefox Anonyme";

        switch ($action) {
            case NULL:
            case 'sendScore':
                print($pseudo);
                $this->chargeGET();
                $this->insertDB();

                //si la BDD contient plus de 10 valeurs
                /*if($this->checkDB() == true) {
                    $this->smallerDB();
                }*/
                break;
            case 'view':
                print($this->getAllFromDB());
                break;
        }
    }
}